/** @file Express bootstrapping. */
import express from "express"
import checkHealth from "#controllers/health"
import { getCachedFile, getCacheKey, saveCachedFile } from "#utils/cacheUtils"
import fs from "node:fs/promises"
import { CHIMES_DIR } from "#config"
import path from "node:path"
import { spawn } from "node:child_process"
import piper from "#services/piper"
import { concatenateAndConvertToMP3, pcmToWav } from "#utils/audioUtils"

const app = express()
app.use(express.json())

// API endpoint
app.post("/generate-audio", async (req, res) => {
  try {
    const { text, chime_type = "notice", cache = true } = req.body

    if (!text) {
      return res.status(400).json({ error: "text is required" })
    }

    console.log(
      `Generating TTS for: "${text}" with chime: ${chime_type}, cache: ${cache}`
    )

    // Check cache if enabled
    let mp3Buffer: Buffer | null = null
    let cachePath: string | null = null

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
    const piperAudio = await piper.synthesize(text)
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

              const chunks: Buffer[] = []
              ffmpeg.stdout.on("data", (chunk) => chunks.push(chunk))
              ffmpeg.on("close", (code) => {
                if (code === 0) resolve(Buffer.concat(chunks))
                else reject(new Error("ffmpeg failed"))
              })
              ffmpeg.stdin.write(ttsWav)
              ffmpeg.stdin.end()
            })

            // Save to cache if enabled
            if (cache && mp3Buffer) {
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
    if (cache && mp3Buffer) {
      const cacheKey = getCacheKey(text, chime_type)
      await saveCachedFile(cacheKey, mp3Buffer)
    }

    // Return combined audio as MP3
    res.set("Content-Type", "audio/mpeg")
    res.set("X-Cache", "MISS")
    res.send(mp3Buffer)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Error:", message)
    res.status(500).json({ error: message ?? "Unknown error" })
  }
})

// Health check endpoint
app.get("/health", checkHealth)

export default app
