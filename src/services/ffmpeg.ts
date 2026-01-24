/** @file FFMPEG service. */
import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import logger from "#utils/logger"

/** Set sample rate to 22,050 as required by Alex devices. */
const MP3_SAMPLE_RATE = ["-ar", "22050"]
/** Set audio channels to 1 as required by Alex devices. */
const MP3_CHANNELS = ["-ac", "1"]

/** MP3 output encoding arguments. */
const MP3_OUTPUT_ARGS = [
  ...MP3_SAMPLE_RATE,
  ...MP3_CHANNELS,
  "-c:a",
  "libmp3lame",
  "-b:a",
  "48k",
  "-f",
  "mp3",
] as const

/**
 * Cleans up temporary files.
 * @param files - Temporary file paths to clean up.
 */
const cleanupTempFiles = (files: string[]): void => {
  Promise.all(files.map(async (f) => fs.unlink(f))).catch((err: unknown) => {
    console.error("Error cleaning up temp files:", err)
  })
}

/**
 * Writes MP3 buffers to temporary files for concatenation.
 * @param chimeBuffer - Audio buffer for chime.
 * @param ttsBuffer - Audio buffer for TTS announcement.
 * @returns Array of temporary file paths.
 */
const writeBuffersToTempFiles = async (
  chimeBuffer: Buffer,
  ttsBuffer: Buffer
): Promise<{ chimeFile: string; ttsFile: string }> => {
  const now = String(Date.now())

  // Generate temporary filenames for chime and TTS buffers
  const chimeFile = path.join("/tmp", `mp3_${now}_chime.mp3`)
  const ttsFile = path.join("/tmp", `mp3_${now}_tts.mp3`)

  // Write buffers to files
  await Promise.all([
    fs.writeFile(chimeFile, chimeBuffer),
    fs.writeFile(ttsFile, ttsBuffer),
  ])

  return { chimeFile, ttsFile }
}

/**
 * Runs ffmpeg with given arguments and returns output buffer.
 * @param args - FFmpeg command line arguments.
 * @param inputBuffer - Optional input buffer to pipe to stdin.
 * @returns Promise resolving to output buffer.
 */
const runFfmpeg = async (
  args: string[],
  inputBuffer?: Buffer
): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", args)
    const chunks: Buffer[] = []

    // Add chunk data on stdout to buffer
    ffmpeg.stdout.on("data", (chunk: Buffer) => chunks.push(chunk))

    // Log debug data on stderr to console
    ffmpeg.stderr.on("data", (data: Buffer) =>
      logger.trace(`ffmpeg stderr: ${data.toString()}`)
    )

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
    [
      // Input format options (must come before -i)
      "-f",
      "s16le",
      ...MP3_SAMPLE_RATE,
      ...MP3_CHANNELS,
      "-i",
      "pipe:0",
      // Output format options (must come after -i)
      ...MP3_OUTPUT_ARGS,
      "pipe:1",
    ],
    pcmBuffer
  )

/**
 * Concatenates two MP3 files.
 * @param chimeBuffer - Audio buffer for chime.
 * @param ttsBuffer - Audio buffer for TTS announcement.
 * @returns Concatenated MP3 buffer.
 */
export const concatenateMp3Files = async (
  chimeBuffer: Buffer,
  ttsBuffer: Buffer
): Promise<Buffer> => {
  const concatListFile = path.join("/tmp", `concat_${Date.now()}.txt`)

  // Write buffers to file so they can be concatenated and converted by ffmpeg
  const { chimeFile, ttsFile } = await writeBuffersToTempFiles(
    chimeBuffer,
    ttsBuffer
  )

  // Concatenate mp3s to get final audio data
  try {
    const concatList = `file '${chimeFile}'\nfile '${ttsFile}'`
    await fs.writeFile(concatListFile, concatList)

    return await runFfmpeg([
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      concatListFile,
      "-c",
      "copy",
      "-f",
      "mp3",
      "pipe:1",
    ])
  } finally {
    cleanupTempFiles([chimeFile, ttsFile, concatListFile])
  }
}
