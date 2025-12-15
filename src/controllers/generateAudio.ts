/** @file Generate audio controller. */
import { spawn } from "node:child_process"
import fs from "node:fs/promises"
import path from "node:path"
import { StatusCodes } from "http-status-codes"
import { CHIMES_DIR } from "#config"
import piper from "#services/piper"
import { concatenateAndConvertToMP3, pcmToWav } from "#utils/audioUtils"
import { getCachedFile, getCacheKey, saveCachedFile } from "#utils/cacheUtils"
import type { RequestHandler } from "express"

interface GenerateAudioRequest {
  text: string
  chime: string
  cache: boolean
}

/**
 * Generates audio for playback on smart speakers.
 * @param req - Request object.
 * @param res - Response object.
 * @returns Audio buffer.
 */
// eslint-disable-next-line max-lines-per-function, max-statements, complexity
const generateAudio: RequestHandler = async (req, res) => {
  try {
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
      `Generating TTS for: "${text}" with chime: ${chime}, cache: ${cache}`
    )

    // Check cache if enabled
    let mp3Buffer: Buffer | null = null
    let cachePath: string | null = null

    if (cache) {
      const cacheKey = getCacheKey(text, chime)
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
    console.log(`Received ${String(piperAudio.length)} bytes from Piper`)

    // Convert PCM to WAV
    const ttsWav = pcmToWav(piperAudio)

    // Load chime file (try .mp3 first, then .wav)
    let chimePath = path.join(CHIMES_DIR, `${chime}.mp3`)
    let chimeBuffer: Buffer | null = null

    try {
      chimeBuffer = await fs.readFile(chimePath)
    } catch {
      // Try WAV format
      try {
        chimePath = path.join(CHIMES_DIR, `${chime}.wav`)
        chimeBuffer = await fs.readFile(chimePath)
      } catch {
        console.warn(
          `Chime file not found: ${chime}.mp3 or .wav, trying default`
        )
        try {
          chimeBuffer = await fs.readFile(path.join(CHIMES_DIR, "notice.mp3"))
        } catch {
          try {
            chimeBuffer = await fs.readFile(path.join(CHIMES_DIR, "notice.wav"))
          } catch {
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
              const cacheKey = getCacheKey(text, chime)
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
      const cacheKey = getCacheKey(text, chime)
      await saveCachedFile(cacheKey, mp3Buffer)
    }

    // Return combined audio as MP3
    res.set("Content-Type", "audio/mpeg")
    res.set("X-Cache", "MISS")
    res.send(mp3Buffer)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Error:", message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: message || "Unknown error" })
  }
}

export default generateAudio
