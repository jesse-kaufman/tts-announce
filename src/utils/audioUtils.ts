/** @file Audio format conversion utilities. */
import fs from "node:fs/promises"
import path from "node:path"
import { MP3_OUTPUT_ARGS, runFfmpeg } from "#services/ffmpeg"
import piper from "#services/piper"

/**
 * Writes MP3 buffers to temporary files for concatenation.
 * @param mp3Buffers - Array of MP3 buffers to write.
 * @returns Array of temporary file paths.
 */
const writeTempFiles = async (mp3Buffers: Buffer[]): Promise<string[]> => {
  const now = String(Date.now())
  const tempFiles = mp3Buffers.map((_, i) =>
    path.join("/tmp", `mp3_${now}_${String(i)}.mp3`)
  )

  await Promise.all(
    tempFiles.map(async (file, i) => fs.writeFile(file, mp3Buffers[i]))
  )

  return tempFiles
}

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
 * Converts PCM to MP3 using ffmpeg.
 * @param pcmBuffer - PCM audio buffer.
 * @returns MP3 audio buffer.
 */
const convertPcmToMp3 = async (pcmBuffer: Buffer): Promise<Buffer> =>
  runFfmpeg(
    ["-f", "s16le", "-i", "pipe:0", ...MP3_OUTPUT_ARGS, "pipe:1"],
    pcmBuffer
  )

/**
 * Concatenates two MP3 files.
 * @param mp3Files - Paths to MP3 files to concatenate.
 * @returns Concatenated MP3 buffer.
 */
const concatenateMp3Files = async (mp3Files: string[]): Promise<Buffer> => {
  const concatListFile = path.join("/tmp", `concat_${String(Date.now())}.txt`)

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

    await fs.unlink(concatListFile).catch(() => {
      // Ignore cleanup errors
    })
    return result
  } catch (err) {
    await fs.unlink(concatListFile).catch(() => {
      // Ignore cleanup errors
    })
    throw err
  }
}

/**
 * Normalizes MP3 to standard settings.
 * @param mp3Buffer - MP3 audio buffer.
 * @returns Normalized MP3 buffer.
 */
const normalizeMp3 = async (mp3Buffer: Buffer): Promise<Buffer> =>
  runFfmpeg(
    ["-f", "mp3", "-i", "pipe:0", ...MP3_OUTPUT_ARGS, "pipe:1"],
    mp3Buffer
  )

/**
 * Attempts to load a chime file.
 * @param chime - Type of chime to load.
 * @returns Chime buffer or null if not found.
 */
const loadChimeFile = async (chime: string): Promise<Buffer | null> => {
  try {
    return await fs.readFile(`${chime}.mp3`)
  } catch {
    console.warn(`Chime file ${chime}.mp3 not found`)
  }

  return null
}

/**
 * Generates MP3 audio from text and optional chime.
 * @param text - Text to synthesize.
 * @param chime - Chime type.
 * @returns MP3 audio buffer.
 */
export const generateMp3 = async (
  text: string,
  chime: string
): Promise<Buffer> => {
  // Get TTS audio from Piper
  const piperAudio = await piper.synthesize(text)
  console.log(`Received ${String(piperAudio.length)} bytes from Piper`)

  // Convert PCM to MP3
  const ttsMp3 = await convertPcmToMp3(piperAudio)

  // Load chime file
  const chimeBuffer = await loadChimeFile(chime)

  // Return TTS-only if no chime
  if (!chimeBuffer) return ttsMp3

  // Normalize chime to match TTS settings and concatenate
  const chimeMp3 = await normalizeMp3(chimeBuffer)
  const tempFiles = await writeTempMp3Files([chimeMp3, ttsMp3])

  try {
    const result = await concatenateMp3Files(tempFiles)
    cleanupTempFiles(tempFiles)
    return result
  } catch (err) {
    cleanupTempFiles(tempFiles)
    throw err
  }
}

export default generateMp3
