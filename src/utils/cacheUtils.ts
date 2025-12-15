/** @file Caching utility functions. */
import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"
import { CACHE_DIR, CACHE_TTL_HOURS } from "#config"

/**
 * Gets cache key for text + chimeType combination.
 * @param text - TTS Message text.
 * @param chime - Chime to play.
 * @returns Cache key for a particular message.
 */
export const getCacheKey = (text: string, chime: string): string => {
  const hash = crypto.createHash("sha256")
  hash.update(`${text}:${chime}`)
  return hash.digest("hex")
}

/**
 * Gets cached file if it exists.
 * @param text - TTS Message text.
 * @param chime - Chime to play.
 * @returns Cached file path if file exists.
 */
export const getCachedFile = async (
  text: string,
  chime: string
): Promise<string | null> => {
  const cacheKey = getCacheKey(text, chime)
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`)

  try {
    const stats = await fs.stat(cachePath)
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const ageHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60)

    // Cache hit and not expired
    if (ageHours < CACHE_TTL_HOURS) {
      console.log(`Cache hit: ${cacheKey} (age: ${ageHours.toFixed(2)}h)`)
      return cachePath
    }

    // Cache hit but expired
    console.log(`Cache expired: ${cacheKey} (age: ${ageHours.toFixed(2)}h)`)
    await fs.unlink(cachePath)
    return null
  } catch {
    // File doesn't exist
    return null
  }
}

/**
 * Saves audio file to cache.
 * @param text - TTS Message text.
 * @param chime - Chime to play.
 * @param mp3Buffer - MP3 buffer data.
 * @returns Path to cached file.
 */
export const saveCachedFile = async (
  text: string,
  chime: string,
  mp3Buffer: Buffer
): Promise<string> => {
  const cacheKey = getCacheKey(text, chime)
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`)
  await fs.writeFile(cachePath, mp3Buffer)
  console.log(`Cached: ${cacheKey}`)
  return cachePath
}
