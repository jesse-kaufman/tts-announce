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
const getChimeAudio = async (chime: string): Promise<Buffer | null> => {
  try {
    return await normalizeMp3(await fs.readFile(`${chime}.mp3`))
  } catch {
    console.warn(`Chime file ${chime}.mp3 not found`)
  }

  return null
}

/**
 * Gets TTS audio in predefined MP3 format.
 * @param text - Text for TTS to speak.
 * @returns Audio buffer.
 */
const getTtsAudio = async (text: string): Promise<Buffer> => {
  // Get TTS audio from Piper
  const piperAudio = await piper.synthesize(text)
  console.log(`Received ${String(piperAudio.length)} bytes from Piper`)

  // Convert PCM to MP3
  return await convertPcmToMp3(piperAudio)
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
  // Get TTS audio from piper
  const ttsBuffer = await getTtsAudio(text)
  // Load chime file
  const chimeBuffer = await getChimeAudio(chime)

  // Return TTS-only if no chime
  if (!chimeBuffer) return ttsBuffer

  // Concatenate mp3s to get final audio data
  const tempFiles = await writeTempFiles([chimeBuffer, ttsBuffer])

  try {
    const result = await concatenateMp3Files(tempFiles)
    return result
  } finally {
    cleanupTempFiles(tempFiles)
  }
}

export default generateMp3
