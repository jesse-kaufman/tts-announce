/** @file Audio stream utility functions. */
import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import net, { type Socket } from "node:net"
import path from "node:path"
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

/**
 * Creates a Wyoming protocol synthesize request.
 * @param text - Text for Piper to speak.
 * @returns Request data string.
 */
const createSynthesizeRequest = (text: string): string =>
  `${JSON.stringify({ type: "synthesize", data: { text } })}\n`

/**
 * Processes Wyoming protocol data stream.
 * @param state - Current state of Wyoming stream.
 * @param data - Wyoming data stream.
 * @param onComplete - Callback to run on complete.
 */
// eslint-disable-next-line max-statements
const processWyomingData = (
  state: WyomingProtocolState,
  data: Buffer,
  onComplete: (audio: Buffer) => void
): void => {
  state.buffer = Buffer.concat([state.buffer, data])

  while (state.buffer.length > 0) {
    if (state.expectingAudio) {
      if (state.buffer.length >= state.currentPayloadLength) {
        const audioChunk = state.buffer.subarray(0, state.currentPayloadLength)
        state.audioChunks.push(audioChunk)
        state.buffer = state.buffer.subarray(state.currentPayloadLength)
        state.expectingAudio = false
        state.currentPayloadLength = 0
      } else {
        break
      }
    } else {
      const newlineIndex = state.buffer.indexOf("\n")
      if (newlineIndex === -1) break

      const line = state.buffer.subarray(0, newlineIndex).toString("utf8")
      state.buffer = state.buffer.subarray(newlineIndex + 1)

      try {
        const event = JSON.parse(line) as WyomingEvent
        console.log("Received event:", event.type)

        if (event.type === "audio-chunk" && event.payload_length) {
          state.expectingAudio = true
          state.currentPayloadLength = event.payload_length
        } else if (event.type === "audio-stop") {
          onComplete(Buffer.concat(state.audioChunks))
          return
        }
      } catch (err) {
        console.error("Error parsing event:", err)
      }
    }
  }
}

/**
 * Connects to Piper and sends a synthesize request.
 * @param text - TTS for Piper to speak.
 * @param onData - Callback for data event.
 * @param onError - Callback for error event.
 * @returns Socket connection to Piper service.
 */
const connectToPiper = (
  text: string,
  onData: (data: Buffer) => void,
  onError: (err: Error) => void
): Socket => {
  const client = net.createConnection(
    { host: PIPER_HOST, port: PIPER_PORT },
    () => {
      console.log("Connected to Piper")
      client.write(createSynthesizeRequest(text))
    }
  )

  client.on("data", onData)
  client.on("error", onError)
  client.on("end", () => console.log("Piper connection closed"))

  return client
}

interface TempFiles {
  chimeFile: string
  ttsFile: string
  concatListFile: string
}

/**
 * Generates temporary file paths for audio processing.
 * @returns Object with temporary audio file paths.
 */
const createTempFilePaths = (): TempFiles => {
  const now = String(Date.now())
  return {
    chimeFile: path.join("/tmp", `chime_${now}.tmp`),
    ttsFile: path.join("/tmp", `tts_${now}.wav`),
    concatListFile: path.join("/tmp", `concat_${now}.txt`),
  }
}

/**
 * Writes audio buffers and concat list to temporary files.
 * @param files - Object with temporary audio file paths.
 * @param chimeBuffer - Chime audio data.
 * @param ttsWavBuffer - TTS audio data.
 */
const writeTempFiles = async (
  files: TempFiles,
  chimeBuffer: Buffer,
  ttsWavBuffer: Buffer
): Promise<void> => {
  await Promise.all([
    fs.writeFile(files.chimeFile, chimeBuffer),
    fs.writeFile(files.ttsFile, ttsWavBuffer),
  ])

  const concatList = `file '${files.chimeFile}'\nfile '${files.ttsFile}'`
  await fs.writeFile(files.concatListFile, concatList)
}

/**
 * Cleans up temporary files.
 * @param files - Temporary files to clean up.
 */
const cleanupTempFiles = (files: TempFiles): void => {
  Promise.all([
    fs.unlink(files.chimeFile),
    fs.unlink(files.ttsFile),
    fs.unlink(files.concatListFile),
  ]).catch((err: unknown) => {
    console.error("Error cleaning up temp files:", err)
  })
}

/**
 * Runs ffmpeg to concatenate and convert audio to MP3.
 * @param concatListFile - List of files to concatenate.
 * @param onComplete - Callback to run on completion.
 * @param onError - Callback to run on error.
 */
const runFfmpeg = (
  concatListFile: string,
  onComplete: (buffer: Buffer) => void,
  onError: (err: Error) => void
): void => {
  const ffmpeg = spawn("ffmpeg", [
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    concatListFile,
    "-ar",
    "22050",
    "-ac",
    "1",
    "-c:a",
    "libmp3lame",
    "-b:a",
    "48k",
    "pipe:1",
  ])

  const chunks: Buffer[] = []

  ffmpeg.stdout.on("data", (chunk: Buffer) => chunks.push(chunk))
  ffmpeg.stderr.on("data", (data) => console.log("ffmpeg:", String(data)))

  ffmpeg.on("close", (code: number): void => {
    if (code === 0) {
      onComplete(Buffer.concat(chunks))
    } else {
      onError(new Error(`ffmpeg exited with code ${String(code)}`))
    }
  })

  ffmpeg.on("error", onError)
}

/**
 * Gets TTS audio from Piper service using Wyoming protocol.
 * @param text - Text for piper to speak.
 * @returns Promise resolving to audio buffer.
 */
export const getPiperAudio = async (text: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const state: WyomingProtocolState = {
      buffer: Buffer.alloc(0),
      expectingAudio: false,
      currentPayloadLength: 0,
      audioChunks: [],
    }

    let client: Socket | null = null

    /**
     * Handles complete event.
     * @param audio - Audio buffer.
     */
    const handleComplete = (audio: Buffer): void => {
      client?.end()
      resolve(audio)
    }

    /**
     * Handles error event.
     * @param err - Error object.
     */
    const handleError = (err: Error): void => {
      console.error("Piper connection error:", err)
      reject(err)
    }

    client = connectToPiper(
      text,
      (data) => processWyomingData(state, data, handleComplete),
      handleError
    )

    setTimeout(() => {
      client.destroy()
      reject(new Error("Piper request timeout"))
    }, PIPER_TIMEOUT)
  })

/**
 * Converts PCM audio to WAV format.
 * @param pcmData - PCM data to convert.
 * @param sampleRate - Sample rate to use in conversion.
 * @param channels - Channel count.
 * @param bitDepth - Bitrate for WAV file.
 * @returns Buffer.
 */
export const pcmToWav = (
  pcmData: Buffer,
  sampleRate = 22_050,
  channels = 1,
  bitDepth = 16
): Buffer => {
  const byteRate = sampleRate * channels * (bitDepth / 8)
  const blockAlign = channels * (bitDepth / 8)
  const dataSize = pcmData.length
  const headerSize = 44

  const buffer = Buffer.alloc(headerSize + dataSize)

  // RIFF header
  buffer.write("RIFF", 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write("WAVE", 8)

  // Fmt chunk
  buffer.write("fmt ", 12)
  buffer.writeUInt32LE(16, 16) // Fmt chunk size
  buffer.writeUInt16LE(1, 20) // Audio format (1 = PCM)
  buffer.writeUInt16LE(channels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(byteRate, 28)
  buffer.writeUInt16LE(blockAlign, 32)
  buffer.writeUInt16LE(bitDepth, 34)

  // Data chunk
  buffer.write("data", 36)
  buffer.writeUInt32LE(dataSize, 40)
  pcmData.copy(buffer, 44)

  return buffer
}

/**
 * Concatenates chime and TTS audio and converts to MP3 format.
 * @param chimeBuffer - Chime audio.
 * @param ttsWavBuffer - TTS audio.
 * @returns Concatenated buffer.
 */
export const concatenateAndConvertToMP3 = async (
  chimeBuffer: Buffer,
  ttsWavBuffer: Buffer
): Promise<Buffer> => {
  const files = createTempFilePaths()

  try {
    await writeTempFiles(files, chimeBuffer, ttsWavBuffer)

    return await new Promise((resolve, reject) => {
      runFfmpeg(
        files.concatListFile,
        (buffer) => {
          cleanupTempFiles(files)
          resolve(buffer)
        },
        (err) => {
          cleanupTempFiles(files)
          reject(err)
        }
      )
    })
  } catch (err) {
    cleanupTempFiles(files)
    throw err
  }
}
