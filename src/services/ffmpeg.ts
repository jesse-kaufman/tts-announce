/** @file FFMPEG service. */
import { spawn } from "node:child_process"

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
    ffmpeg.stderr.on("data", (data) => console.log("ffmpeg:", String(data)))

    // Resolve or reject based on exit code from ffmpeg
    ffmpeg.on("close", (code: number) => {
      if (code === 0) {
        resolve(Buffer.concat(chunks))
      } else {
        reject(new Error(`ffmpeg exited with code ${String(code)}`))
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
