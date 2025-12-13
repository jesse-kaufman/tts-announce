/** @file Caching utility functions. */

// Generate cache key from text and chime type
function getCacheKey(text, chimeType) {
  const hash = crypto.createHash("sha256")
  hash.update(`${text}:${chimeType}`)
  return hash.digest("hex")
}

// Check if cached file exists and is not expired
async function getCachedFile(cacheKey) {
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`)

  try {
    const stats = await fs.stat(cachePath)
    const ageHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60)

    if (ageHours < CACHE_TTL_HOURS) {
      console.log(`Cache hit: ${cacheKey} (age: ${ageHours.toFixed(2)}h)`)
      return cachePath
    } else {
      console.log(`Cache expired: ${cacheKey} (age: ${ageHours.toFixed(2)}h)`)
      // Delete expired file
      await fs.unlink(cachePath).catch(() => {})
      return null
    }
  } catch (err) {
    // File doesn't exist
    return null
  }
}

// Save MP3 to cache
async function saveCachedFile(cacheKey, mp3Buffer) {
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`)
  await fs.writeFile(cachePath, mp3Buffer)
  console.log(`Cached: ${cacheKey}`)
  return cachePath
}
