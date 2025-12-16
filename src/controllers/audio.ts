/** @file Generate audio controller. */
import fs from "node:fs/promises"
import { StatusCodes } from "http-status-codes"
import { generateAudio } from "#utils/audioUtils"
import { getCachedFile, saveCachedFile } from "#utils/cacheUtils"
import type { RequestHandler } from "express"

interface AudioApiRequest {
  chime: string
  text: string
  cache: boolean
  voice?: string
  speaker?: number
}

interface AnnounceOptions {
  chime: string
  text: string
  voice?: string
  speaker?: number
}

/**
 * Gets audio from cache or generates it.
 * @param opts - Options for announce service.
 * @param useCache - Whether to use cache.
 * @returns Object with audio buffer and cache status.
 */
const getAnnounceData = async (
  opts: AnnounceOptions,
  useCache: boolean
): Promise<{ audio: Buffer; fromCache: boolean }> => {
  // Try cache first
  if (useCache) {
    const cachePath = await getCachedFile(opts)

    if (cachePath) {
      const audio = await fs.readFile(cachePath)
      return { audio, fromCache: true }
    }
  }

  // Generate audio
  const audio = await generateAudio(opts)

  // Save cached file if set
  if (useCache) await saveCachedFile(opts, audio)

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
    voice,
    speaker,
  } = req.body as AudioApiRequest

  if (!text) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "text is required" })
    return
  }

  console.log(
    `Generating TTS for: "${text}" with chime: ${chime}, voice: ${voice ?? "default"}, speaker: ${speaker ?? "default"}, cache: ${cache}`
  )

  try {
    // Setup announcement service options
    const announceOpts = { text, voice, speaker, chime }
    // Get or generate audio
    const { audio, fromCache } = await getAnnounceData(announceOpts, cache)

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

export type { AnnounceOptions }
export default getAudio
