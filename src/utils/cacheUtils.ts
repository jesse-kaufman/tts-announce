/** @file Caching utility functions. */
import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"
import { CACHE_DIR, CACHE_TTL_HOURS } from "#config"
import type { AnnounceOptions } from "#controllers/audio"

/**
 * Gets cache key for text + chimeType + voice + speaker combination.
 * @param opts - Announcement service options.
 * @returns Cache key for a particular message.
 */
export const getCacheKey = (opts: AnnounceOptions): string => {
  const { chime, text, voice, speaker } = opts
  const hash = crypto.createHash("sha256")
  const key = `${text}:${chime}:${voice ?? ""}:${speaker ?? ""}`
  hash.update(key)
  return hash.digest("hex")
}

/**
 * Gets cached file if it exists.
 * @param opts - Announce service options.
 * @returns Cached file path if file exists.
 */
export const getCachedFile = async (
  opts: AnnounceOptions
): Promise<string | null> => {
  const cacheKey = getCacheKey(opts)
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
 * @param opts - Announce service options.
 * @param mp3Buffer - MP3 buffer data.
 * @returns Path to cached file.
 */
export const saveCachedFile = async (
  opts: AnnounceOptions,
  mp3Buffer: Buffer
): Promise<string> => {
  const cacheKey = getCacheKey(opts)
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`)
  await fs.writeFile(cachePath, mp3Buffer)
  console.log(`Cached: ${cacheKey}`)
  return cachePath
}
