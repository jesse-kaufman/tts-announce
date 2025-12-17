/** @file Piper service using the Wyoming client protocol. */
import net, { type Socket } from "node:net"
import { PIPER_HOST, PIPER_PORT, PIPER_TIMEOUT } from "#config"
import logger from "#utils/logger"

type WyomingEvent =
  | { type: "audio-chunk"; data_length: number; payload_length: number }
  | { type: "audio-stop" }
  | { type: string; data_length?: number; payload_length?: number }

interface WyomingProtocolState {
  buffer: Buffer
  expectingAudio: boolean
  expectingMetadata: boolean
  currentDataLength: number
  currentPayloadLength: number
  audioChunks: Buffer[]
}

interface SynthesizeOptions {
  text: string
  voice?: string
  speaker?: number
}

/**
 * Creates a Wyoming protocol synthesize request.
 * @param options - Synthesis options.
 * @returns Request data string.
 */
const createSynthesizeRequest = (options: SynthesizeOptions): string => {
  const data: Record<string, unknown> = { text: options.text }

  if (options.voice) data.voice = { name: options.voice }
  if (options.speaker !== undefined) data.speaker = options.speaker

  return `${JSON.stringify({ type: "synthesize", data })}\n`
}

/**
 * Skips metadata section from buffer.
 * @param state - Protocol state.
 * @returns True if metadata was skipped, false if more data needed.
 */
const skipMetadata = (state: WyomingProtocolState): boolean => {
  if (state.buffer.length < state.currentDataLength) return false

  state.buffer = state.buffer.subarray(state.currentDataLength)
  state.expectingMetadata = false
  state.currentDataLength = 0
  state.expectingAudio = true
  return true
}

/**
 * Extracts an audio chunk from the buffer.
 * @param state - Protocol state.
 * @returns True if chunk was extracted, false if more data needed.
 */
const extractAudioChunk = (state: WyomingProtocolState): boolean => {
  if (state.buffer.length < state.currentPayloadLength) return false

  const audioChunk = state.buffer.subarray(0, state.currentPayloadLength)
  state.audioChunks.push(audioChunk)
  state.buffer = state.buffer.subarray(state.currentPayloadLength)
  state.expectingAudio = false
  state.currentPayloadLength = 0
  return true
}

/**
 * Parses and handles a Wyoming event.
 * @param state - Protocol state.
 * @param line - JSON event line.
 * @param onComplete - Completion callback.
 * @returns True if processing should continue, false if complete.
 */
const handleWyomingEvent = (
  state: WyomingProtocolState,
  line: string,
  onComplete: (audio: Buffer) => void
): boolean => {
  let braceCount = 0
  let inString = false
  let jsonEnd = -1

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"' && (i === 0 || line[i - 1] !== "\\")) {
      inString = !inString
    }
    if (!inString) {
      if (char === "{") {
        braceCount++
      } else if (char === "}") {
        braceCount--
        if (braceCount === 0) {
          jsonEnd = i + 1
          break
        }
      }
    }
  }

  if (jsonEnd === -1) return true

  try {
    const event = JSON.parse(line.slice(0, jsonEnd)) as WyomingEvent

    if (event.type === "audio-chunk" && event.payload_length) {
      // Set state to expect metadata then audio
      if (event.data_length && event.data_length > 0) {
        state.expectingMetadata = true
        state.currentDataLength = event.data_length
      } else {
        state.expectingAudio = true
      }
      state.currentPayloadLength = event.payload_length
      return true
    }

    if (event.type === "audio-stop") {
      onComplete(Buffer.concat(state.audioChunks))
      return false
    }

    return true
  } catch {
    return true
  }
}

/**
 * Extracts and processes a Wyoming event from the buffer.
 * @param state - Protocol state.
 * @param onComplete - Completion callback.
 * @returns True if event was processed, false if more data needed.
 */
const processWyomingEvent = (
  state: WyomingProtocolState,
  onComplete: (audio: Buffer) => void
): boolean => {
  const openBrace = state.buffer.indexOf("{")
  if (openBrace === -1) return false

  if (openBrace > 0) {
    state.buffer = state.buffer.subarray(openBrace)
  }

  const newlineIndex = state.buffer.indexOf("\n")
  if (newlineIndex === -1) return false

  const line = state.buffer.subarray(0, newlineIndex).toString("utf8")
  state.buffer = state.buffer.subarray(newlineIndex + 1)

  return handleWyomingEvent(state, line, onComplete)
}

/**
 * Processes Wyoming protocol data stream.
 * @param state - Current state of Wyoming stream.
 * @param data - Wyoming data stream.
 * @param onComplete - Callback to run on complete.
 */
const processData = (
  state: WyomingProtocolState,
  data: Buffer,
  onComplete: (audio: Buffer) => void
): void => {
  state.buffer = Buffer.concat([state.buffer, data])

  while (state.buffer.length > 0) {
    // State machine: metadata -> audio -> event -> metadata -> audio -> ...
    let canContinue = false
    if (state.expectingMetadata) {
      canContinue = skipMetadata(state)
    } else if (state.expectingAudio) {
      canContinue = extractAudioChunk(state)
    } else {
      canContinue = processWyomingEvent(state, onComplete)
    }

    if (!canContinue) break
  }
}

/**
 * Creates a socket connection to Piper service.
 * @returns Connected socket.
 */
const connectSocket = (): Socket =>
  net.createConnection({ host: PIPER_HOST, port: PIPER_PORT }, () => {
    console.log("Connected to Piper")
  })

/**
 * Sets up timeout for connection.
 * @param client - Socket client.
 * @param onTimeout - Timeout callback.
 */
const setupTimeout = (client: Socket, onTimeout: () => void): void => {
  setTimeout(() => {
    client.destroy()
    onTimeout()
  }, PIPER_TIMEOUT)
}

/**
 * Synthesizes text to audio using Piper TTS service.
 * @param text - Text to convert to speech.
 * @param voice - Optional voice name.
 * @param speaker - Optional speaker ID.
 * @returns Promise resolving to audio buffer.
 */
export const synthesize = async (
  text: string,
  voice?: string,
  speaker?: number
): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    let resolved = false

    // Initialize state
    const state: WyomingProtocolState = {
      buffer: Buffer.alloc(0),
      expectingAudio: false,
      expectingMetadata: false,
      currentDataLength: 0,
      currentPayloadLength: 0,
      audioChunks: [],
    }

    // Connect to Wyoming socket
    const client = connectSocket()

    const request = createSynthesizeRequest({ text, voice, speaker })
    logger.debug(request)
    // Send synthesize request on connect
    client.on("connect", () => client.write(request))

    // Handle received audio data
    client.on("data", (data: Buffer): void => {
      processData(state, data, (audio: Buffer): void => {
        if (resolved) return
        resolved = true
        logger.debug(`Received ${audio.length} bytes from Piper`)
        client.destroy()
        resolve(audio)
      })
    })

    // Handle errors
    client.on("error", (err: Error): void => {
      client.destroy()
      logger.error(`Piper connection error: ${err.message}`)
      reject(err)
    })

    client.on("end", () => logger.debug("Piper connection closed"))
    client.on("close", () => logger.debug("Piper socket closed"))

    // Handle timeout
    setupTimeout(client, () => reject(new Error("Piper request timeout")))
  })

export default { synthesize }
