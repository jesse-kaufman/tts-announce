/** @file Audio format conversion utilities. */
import fs from "node:fs/promises"
import path from "node:path"
import {
  concatenateMp3Files,
  convertPcmToMp3,
  normalizeMp3,
} from "#services/ffmpeg"
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
