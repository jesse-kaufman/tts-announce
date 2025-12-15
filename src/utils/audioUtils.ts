/** @file Audio format conversion utilities. */
import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import piper from "#services/piper"
import pcmToWav from "./pcmUtils"

interface TempFiles {
  chimeFile: string
  ttsFile: string
  concatListFile: string
}

/** Common ffmpeg MP3 output arguments. */
const MP3_OUTPUT_ARGS = [
  "-ar",
  "22050",
  "-ac",
  "1",
  "-c:a",
  "libmp3lame",
  "-b:a",
  "48k",
  "pipe:1",
] as const

/**
 * Generates temporary file paths for audio processing.
 * @returns Object with temporary audio file paths.
 */
const getTempFilePaths = (): TempFiles => {
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

    ffmpeg.stdout.on("data", (chunk: Buffer) => chunks.push(chunk))
    ffmpeg.stderr.on("data", (data) => console.log("ffmpeg:", String(data)))

    ffmpeg.on("close", (code: number) => {
      if (code === 0) {
        resolve(Buffer.concat(chunks))
      } else {
        reject(new Error(`ffmpeg exited with code ${String(code)}`))
      }
    })

    ffmpeg.on("error", reject)

    // Write input if provided
    if (inputBuffer) {
      ffmpeg.stdin.write(inputBuffer)
      ffmpeg.stdin.end()
    }
  })

/**
 * Concatenates chime and TTS audio and converts to MP3 format.
 * @param chimeBuffer - Chime audio.
 * @param ttsWavBuffer - TTS audio.
 * @returns Concatenated buffer.
 */
const concatenateAndConvertToMP3 = async (
  chimeBuffer: Buffer,
  ttsWavBuffer: Buffer
): Promise<Buffer> => {
  const files = getTempFilePaths()

  try {
    await writeTempFiles(files, chimeBuffer, ttsWavBuffer)

    const result = await runFfmpeg([
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      files.concatListFile,
      ...MP3_OUTPUT_ARGS,
    ])

    cleanupTempFiles(files)
    return result
  } catch (err) {
    cleanupTempFiles(files)
    throw err
  }
}

/**
 * Converts WAV to MP3 using ffmpeg.
 * @param wavBuffer - WAV audio buffer.
 * @returns MP3 audio buffer.
 */
const convertToMP3 = async (wavBuffer: Buffer): Promise<Buffer> =>
  runFfmpeg(["-f", "wav", "-i", "pipe:0", ...MP3_OUTPUT_ARGS], wavBuffer)

/**
 * Attempts to load a chime file.
 * @param chime - Type of chime to load.
 * @returns Chime buffer or null if not found.
 */
const loadChimeFile = async (chime: string): Promise<Buffer | null> => {
  try {
    return await fs.readFile(`${chime}.mp3`)
  } catch {
    // No-op
  }

  console.warn(`Chime file ${chime}.mp3 not found`)
  return null
}

/**
 * Generates MP3 audio from text and optional chime.
 * @param text - Text to synthesize.
 * @param chime - Chime type.
 * @returns MP3 audio buffer.
 */
export const generateMP3 = async (
  text: string,
  chime: string
): Promise<Buffer> => {
  // Get TTS audio from Piper
  const piperAudio = await piper.synthesize(text)
  console.log(`Received ${String(piperAudio.length)} bytes from Piper`)

  // Convert PCM to WAV
  const ttsWav = pcmToWav(piperAudio)

  // Load chime file
  const chimeBuffer = await loadChimeFile(chime)

  // Generate MP3 with or without chime
  return chimeBuffer
    ? await concatenateAndConvertToMP3(chimeBuffer, ttsWav)
    : await convertToMP3(ttsWav)
}

export default generateMP3
