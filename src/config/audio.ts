/** @file Configuration for audio files. */

/** Absolute path to mp3 cache storage. */
export const CACHE_DIR: string = process.env.CACHE_DIR || "/cache"

/** TTL (in hours) for mp3 cache.  */
export const CACHE_TTL_HOURS = Number(process.env.CACHE_TTL_HOURS || "24")

/** Directory where chime mp3 files are stored. */
export const CHIMES_DIR: string = process.env.CHIMES_DIR || "/chimes"
