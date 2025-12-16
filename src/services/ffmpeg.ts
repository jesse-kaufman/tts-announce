/** @file FFMPEG service. */
import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"

/** MP3 output encoding arguments. */
export const MP3_OUTPUT_ARGS = [
  "-ar",
  "22050",
  "-ac",
  "1",
  "-c:a",
  "libmp3lame",
  "-b:a",
  "48k",
] as const

/**
 * Runs ffmpeg with given arguments and returns output buffer.
 * @param args - FFmpeg command line arguments.
 * @param inputBuffer - Optional input buffer to pipe to stdin.
 * @returns Promise resolving to output buffer.
 */
export const runFfmpeg = async (
  args: string[],
  inputBuffer?: Buffer
): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", args)
    const chunks: Buffer[] = []

    // Add chunk data on stdout to buffer
    ffmpeg.stdout.on("data", (chunk: Buffer) => chunks.push(chunk))

    // Log data on stderr to console
    ffmpeg.stderr.on("data", (data) => console.log("ffmpeg:", data))

    // Resolve or reject based on exit code from ffmpeg
    ffmpeg.on("close", (code: number) => {
      if (code === 0) {
        resolve(Buffer.concat(chunks))
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`))
      }
    })

    // Reject if ffmpeg emits an error
    ffmpeg.on("error", reject)

    // Write input if provided
    if (inputBuffer) {
      ffmpeg.stdin.write(inputBuffer)
      ffmpeg.stdin.end()
    }
  })

/**
 * Normalizes MP3 to standard settings.
 * @param mp3Buffer - MP3 audio buffer.
 * @returns Normalized MP3 buffer.
 */
export const normalizeMp3 = async (mp3Buffer: Buffer): Promise<Buffer> =>
  runFfmpeg(
    ["-f", "mp3", "-i", "pipe:0", ...MP3_OUTPUT_ARGS, "pipe:1"],
    mp3Buffer
  )

/**
 * Converts PCM to MP3 using ffmpeg.
 * @param pcmBuffer - PCM audio buffer.
 * @returns MP3 audio buffer.
 */
export const convertPcmToMp3 = async (pcmBuffer: Buffer): Promise<Buffer> =>
  runFfmpeg(
    ["-f", "s16le", "-i", "pipe:0", ...MP3_OUTPUT_ARGS, "pipe:1"],
    pcmBuffer
  )

/**
 * Concatenates two MP3 files.
 * @param mp3Files - Paths to MP3 files to concatenate.
 * @returns Concatenated MP3 buffer.
 */
export const concatenateMp3Files = async (
  mp3Files: string[]
): Promise<Buffer> => {
  const concatListFile = path.join("/tmp", `concat_${Date.now()}.txt`)

  try {
    const concatList = mp3Files.map((f) => `file '${f}'`).join("\n")
    await fs.writeFile(concatListFile, concatList)

    const result = await runFfmpeg([
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      concatListFile,
      "-c",
      "copy", // No re-encoding needed
      "pipe:1",
    ])

    void fs.unlink(concatListFile).catch()
    return result
  } catch (err) {
    void fs.unlink(concatListFile).catch()
    throw err
  }
}
