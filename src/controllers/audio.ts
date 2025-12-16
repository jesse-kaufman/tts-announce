/** @file Generate audio controller. */
import fs from "node:fs/promises"
import { StatusCodes } from "http-status-codes"
import { generateMp3 } from "#utils/audioUtils"
import { getCachedFile, saveCachedFile } from "#utils/cacheUtils"
import type { RequestHandler } from "express"

interface GenerateAudioRequest {
  text: string
  chime: string
  cache: boolean
}

/**
 * Gets audio from cache or generates it.
 * @param text - Text to synthesize.
 * @param chime - Chime type.
 * @param useCache - Whether to use cache.
 * @returns Object with audio buffer and cache status.
 */
const getAudioData = async (
  text: string,
  chime: string,
  useCache: boolean
): Promise<{ audio: Buffer; fromCache: boolean }> => {
  // Try cache first
  if (useCache) {
    const cachePath = await getCachedFile(text, chime)

    if (cachePath) {
      const audio = await fs.readFile(cachePath)
      return { audio, fromCache: true }
    }
  }

  // Generate audio
  const audio = await generateMp3(text, chime)

  // Save cached file if set
  if (useCache) await saveCachedFile(text, chime, audio)

  return { audio, fromCache: false }
}

/**
 * Generates audio for playback on smart speakers.
 * @param req - Request object.
 * @param res - Response object.
 * @returns Audio buffer.
 */
const getAudio: RequestHandler = async (req, res) => {
  const {
    text,
    chime = "notice",
    cache = true,
  } = req.body as GenerateAudioRequest

  if (!text) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "text is required" })
    return
  }

  console.log(
    `Generating TTS for: "${text}" with chime: ${chime}, cache: ${String(cache)}`
  )

  try {
    // Get or generate audio
    const { audio, fromCache } = await getAudioData(text, chime, cache)

    // Send response
    res.set("Content-Type", "audio/mpeg")
    res.set("X-Cache", fromCache ? "HIT" : "MISS")
    res.send(audio)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Error:", message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: message || "Unknown error" })
  }
}

export default getAudio
