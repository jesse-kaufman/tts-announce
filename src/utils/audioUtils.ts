/** @file Audio generation utilities. */
import fs from "node:fs/promises"
import path from "node:path"
import { CHIMES_DIR } from "#config"
import {
  concatenateMp3Files,
  convertPcmToMp3,
  normalizeMp3,
} from "#services/ffmpeg"
import piper from "#services/piper"
import type { AnnounceOptions } from "#controllers/announce"

/**
 * Attempts to load a chime file.
 * @param chime - Type of chime to load.
 * @returns Chime buffer or null if not found.
 */
const getChimeAudio = async (chime: string): Promise<Buffer | null> => {
  const chimeFilePath = path.join(CHIMES_DIR, `${chime}.mp3`)

  try {
    const chimeBuffer = await fs.readFile(chimeFilePath)
    return await normalizeMp3(chimeBuffer)
  } catch {
    console.warn(`Chime file ${chime}.mp3 not found`)
  }

  return null
}

/**
 * Gets TTS audio in predefined MP3 format.
 * @param text - Text for TTS to speak.
 * @param voice - Voice name.
 * @param speaker - Speaker ID.
 * @returns Audio buffer.
 */
const getTtsAudio = async (
  text?: string,
  voice?: string,
  speaker?: number
): Promise<Buffer | null> => {
  // If text is undefined or null, return null
  if (text == null) return null
  // If text trims to empty string, return null
  if (text.trim() === "") return null

  // Get TTS audio from Piper
  const piperAudio = await piper.synthesize(text, voice, speaker)
  console.log(`Received ${String(piperAudio.length)} bytes from Piper`)

  // Convert PCM to MP3
  return await convertPcmToMp3(piperAudio)
}

/**
 * Generates MP3 audio from text and optional chime.
 * @param opts - Options for generating audio.
 * @returns MP3 audio buffer.
 */
export const generateAudio = async (
  opts: AnnounceOptions
): Promise<Buffer | null> => {
  const { chime, text, voice, speaker } = opts
  // Get TTS audio from piper
  const ttsBuffer = await getTtsAudio(text, voice, speaker)
  // Load chime file
  const chimeBuffer = await getChimeAudio(chime)

  // Return only TTS if no chime
  if (!chimeBuffer) return ttsBuffer
  // Return only chime if no TTS
  if (!ttsBuffer) return chimeBuffer

  // Concatenate mp3s to get final audio data
  return await concatenateMp3Files(chimeBuffer, ttsBuffer)
}

export default generateAudio
