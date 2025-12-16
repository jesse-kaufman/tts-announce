/** @file Main tts-announce server. */
import { mkdir } from "node:fs/promises"
import {
  CACHE_DIR,
  CACHE_TTL_HOURS,
  CHIMES_DIR,
  PIPER_HOST,
  PIPER_PORT,
  PORT,
} from "#config"
import app from "./src/app"

// Ensure cache directory exists
try {
  await mkdir(CACHE_DIR, { recursive: true })
} catch (err) {
  console.error(err)
}

app.listen(PORT, () => {
  console.log(`TTS Chime Service running on port ${PORT}`)
  console.log(`Piper: ${PIPER_HOST}:${PIPER_PORT}`)
  console.log(`Chimes directory: ${CHIMES_DIR}`)
  console.log(`Cache directory: ${CACHE_DIR}`)
  console.log(`Cache TTL: ${CACHE_TTL_HOURS} hours`)
})
