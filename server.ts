import express from "express"
import net from "net"
const fs = require("fs").promises
import path from "path"
import { spawn } from "child_process"
import { promisify } from "util"
import { pipeline } from "stream"
import crypto from "crypto"
import checkHealth from "./src/controllers/health"

const streamPipeline = promisify(pipeline)

const app = express()
app.use(express.json())

const PIPER_HOST = process.env.PIPER_HOST || "piper"
const PIPER_PORT = process.env.PIPER_PORT || 10200
const CHIMES_DIR = process.env.CHIMES_DIR || "/chimes"
const CACHE_DIR = process.env.CACHE_DIR || "/cache"
const CACHE_TTL_HOURS = parseInt(process.env.CACHE_TTL_HOURS || "24", 10)
const PORT = process.env.PORT || 3000

// Ensure cache directory exists
fs.mkdir(CACHE_DIR, { recursive: true }).catch(console.error)

// API endpoint
app.post("/tts", async (req, res) => {
  try {
    const { text, chime_type = "notice", cache = true } = req.body

    if (!text) {
      return res.status(400).json({ error: "text is required" })
    }

    console.log(
      `Generating TTS for: "${text}" with chime: ${chime_type}, cache: ${cache}`
    )

    // Check cache if enabled
    let mp3Buffer
    let cachePath = null

    if (cache) {
      const cacheKey = getCacheKey(text, chime_type)
      cachePath = await getCachedFile(cacheKey)

      if (cachePath) {
        // Return cached file
        mp3Buffer = await fs.readFile(cachePath)
        res.set("Content-Type", "audio/mpeg")
        res.set("X-Cache", "HIT")
        return res.send(mp3Buffer)
      }
    }

    // Get TTS audio from Piper
    const piperAudio = await getPiperAudio(text)
    console.log(`Received ${piperAudio.length} bytes from Piper`)

    // Convert PCM to WAV
    const ttsWav = pcmToWav(piperAudio)

    // Load chime file (try .mp3 first, then .wav)
    let chimePath = path.join(CHIMES_DIR, `${chime_type}.mp3`)
    let chimeBuffer

    try {
      chimeBuffer = await fs.readFile(chimePath)
    } catch (err) {
      // Try WAV format
      try {
        chimePath = path.join(CHIMES_DIR, `${chime_type}.wav`)
        chimeBuffer = await fs.readFile(chimePath)
      } catch (err2) {
        console.warn(
          `Chime file not found: ${chime_type}.mp3 or .wav, trying default`
        )
        try {
          chimeBuffer = await fs.readFile(path.join(CHIMES_DIR, "notice.mp3"))
        } catch (err3) {
          try {
            chimeBuffer = await fs.readFile(path.join(CHIMES_DIR, "notice.wav"))
          } catch (err4) {
            console.warn("No chime files found, returning TTS only")
            // Convert TTS WAV to MP3 (Alexa-compatible) and return
            mp3Buffer = await new Promise((resolve, reject) => {
              const ffmpeg = spawn("ffmpeg", [
                "-f",
                "wav",
                "-i",
                "pipe:0",
                "-ar",
                "22050", // Sample rate for Alexa
                "-ac",
                "1", // Mono
                "-c:a",
                "libmp3lame",
                "-b:a",
                "48k", // Bitrate for Alexa
                "pipe:1",
              ])

              const chunks = []
              ffmpeg.stdout.on("data", (chunk) => chunks.push(chunk))
              ffmpeg.on("close", (code) => {
                if (code === 0) resolve(Buffer.concat(chunks))
                else reject(new Error("ffmpeg failed"))
              })
              ffmpeg.stdin.write(ttsWav)
              ffmpeg.stdin.end()
            })

            // Save to cache if enabled
            if (cache) {
              const cacheKey = getCacheKey(text, chime_type)
              await saveCachedFile(cacheKey, mp3Buffer)
            }

            res.set("Content-Type", "audio/mpeg")
            res.set("X-Cache", "MISS")
            return res.send(mp3Buffer)
          }
        }
      }
    }

    // Concatenate chime + TTS and convert to MP3
    mp3Buffer = await concatenateAndConvertToMP3(chimeBuffer, ttsWav)

    // Save to cache if enabled
    if (cache) {
      const cacheKey = getCacheKey(text, chime_type)
      await saveCachedFile(cacheKey, mp3Buffer)
    }

    // Return combined audio as MP3
    res.set("Content-Type", "audio/mpeg")
    res.set("X-Cache", "MISS")
    res.send(mp3Buffer)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: error.message })
  }
})

// Health check endpoint
app.get("/health", checkHealth)

app.listen(PORT, () => {
  console.log(`TTS Chime Service running on port ${PORT}`)
  console.log(`Piper: ${PIPER_HOST}:${PIPER_PORT}`)
  console.log(`Chimes directory: ${CHIMES_DIR}`)
  console.log(`Cache directory: ${CACHE_DIR}`)
  console.log(`Cache TTL: ${CACHE_TTL_HOURS} hours`)
})
