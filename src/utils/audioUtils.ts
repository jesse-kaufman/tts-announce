/** @file Audio format conversion utilities. */
import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"

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
