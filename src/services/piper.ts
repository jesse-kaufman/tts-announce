/** @file Piper service using the Wyoming client protocol. */
import net, { type Socket } from "node:net"
import { PIPER_HOST, PIPER_PORT, PIPER_TIMEOUT } from "#config"

type WyomingEvent =
  | { type: "audio-chunk"; payload_length: number }
  | { type: "audio-stop" }
  | { type: string; payload_length?: number }

interface WyomingProtocolState {
  buffer: Buffer
  expectingAudio: boolean
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

  if (options.voice) data.voice = options.voice
  if (options.speaker !== undefined) data.speaker = options.speaker

  return `${JSON.stringify({ type: "synthesize", data })}\n`
}

/**
 * Extracts an audio chunk from the buffer.
 * @param state - Protocol state.
 * @returns True if chunk was extracted, false if more data needed.
 */
const extractAudioChunk = (state: WyomingProtocolState): boolean => {
  // More data needed
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
  try {
    const event = JSON.parse(line) as WyomingEvent
    console.log("Received event:", event.type)

    // Received chunk of audio
    if (event.type === "audio-chunk" && event.payload_length) {
      state.expectingAudio = true
      state.currentPayloadLength = event.payload_length
      return true
    }

    // Done receiving audio
    if (event.type === "audio-stop") {
      onComplete(Buffer.concat(state.audioChunks))
      return false
    }

    return true
  } catch (err) {
    console.error("Error parsing event:", err)
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
    // If expecting audio, extract chunk, otherwise process Wyoming event
    const canContinue = state.expectingAudio
      ? extractAudioChunk(state)
      : processWyomingEvent(state, onComplete)

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
    // Initialize state
    const state: WyomingProtocolState = {
      buffer: Buffer.alloc(0),
      expectingAudio: false,
      currentPayloadLength: 0,
      audioChunks: [],
    }

    // Connect to Wyoming socket
    const client = connectSocket()

    // Send synthesize request on connect
    client.on("connect", () =>
      client.write(createSynthesizeRequest({ text, voice, speaker }))
    )

    // Handle received audio data
    client.on("data", (data: Buffer): void => {
      // Process received data
      processData(state, data, (audio: Buffer): void => {
        // Close connection and resolve with audio data when complete
        client.end()
        resolve(audio)
      })
    })

    // Handle errors
    client.on("error", (err: Error): void => {
      // Close the connection
      client.destroy()
      console.error("Piper connection error:", err)
      reject(err)
    })

    // Log when connection ends
    client.on("end", () => console.log("Piper connection closed"))

    // Handle timeout
    setupTimeout(client, () => reject(new Error("Piper request timeout")))
  })

export default { synthesize }
