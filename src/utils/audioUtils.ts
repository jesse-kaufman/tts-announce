/** @file Audio stream utility functions. */

// Wyoming protocol client for Piper TTS
async function getPiperAudio(text) {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(
      { host: PIPER_HOST, port: PIPER_PORT },
      () => {
        console.log("Connected to Piper")

        // Send synthesize request
        const request = {
          type: "synthesize",
          data: {
            text: text,
          },
        }

        client.write(JSON.stringify(request) + "\n")
      }
    )

    let audioChunks = []
    let buffer = Buffer.alloc(0)
    let expectingAudio = false
    let currentPayloadLength = 0

    client.on("data", (data) => {
      buffer = Buffer.concat([buffer, data])

      while (buffer.length > 0) {
        if (!expectingAudio) {
          // Look for newline to parse JSON event
          const newlineIndex = buffer.indexOf("\n")
          if (newlineIndex === -1) break // Need more data

          const line = buffer.slice(0, newlineIndex).toString("utf-8")
          buffer = buffer.slice(newlineIndex + 1)

          try {
            const event = JSON.parse(line)
            console.log("Received event:", event.type)

            if (event.type === "audio-chunk" && event.payload_length) {
              expectingAudio = true
              currentPayloadLength = event.payload_length
            } else if (event.type === "audio-stop") {
              // Done receiving audio
              client.end()
              const audioBuffer = Buffer.concat(audioChunks)
              resolve(audioBuffer)
              return
            }
          } catch (e) {
            console.error("Error parsing event:", e)
          }
        } else {
          // Reading audio payload
          if (buffer.length >= currentPayloadLength) {
            const audioChunk = buffer.slice(0, currentPayloadLength)
            audioChunks.push(audioChunk)
            buffer = buffer.slice(currentPayloadLength)
            expectingAudio = false
            currentPayloadLength = 0
          } else {
            break // Need more data
          }
        }
      }
    })

    client.on("error", (err) => {
      console.error("Piper connection error:", err)
      reject(err)
    })

    client.on("end", () => {
      console.log("Piper connection closed")
    })

    // Timeout after 30 seconds
    setTimeout(() => {
      client.destroy()
      reject(new Error("Piper request timeout"))
    }, 30000)
  })
}

// Convert raw PCM to WAV format
function pcmToWav(pcmData, sampleRate = 22050, channels = 1, bitDepth = 16) {
  const byteRate = sampleRate * channels * (bitDepth / 8)
  const blockAlign = channels * (bitDepth / 8)
  const dataSize = pcmData.length
  const headerSize = 44

  const buffer = Buffer.alloc(headerSize + dataSize)

  // RIFF header
  buffer.write("RIFF", 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write("WAVE", 8)

  // fmt chunk
  buffer.write("fmt ", 12)
  buffer.writeUInt32LE(16, 16) // fmt chunk size
  buffer.writeUInt16LE(1, 20) // audio format (1 = PCM)
  buffer.writeUInt16LE(channels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(byteRate, 28)
  buffer.writeUInt16LE(blockAlign, 32)
  buffer.writeUInt16LE(bitDepth, 34)

  // data chunk
  buffer.write("data", 36)
  buffer.writeUInt32LE(dataSize, 40)
  pcmData.copy(buffer, 44)

  return buffer
}

// Use ffmpeg to concatenate audio files and convert to MP3
async function concatenateAndConvertToMP3(chimeBuffer, ttsWavBuffer) {
  return new Promise((resolve, reject) => {
    // Write temp files
    const tmpDir = "/tmp"
    const chimeFile = path.join(tmpDir, `chime_${Date.now()}.tmp`)
    const ttsFile = path.join(tmpDir, `tts_${Date.now()}.wav`)
    const concatListFile = path.join(tmpDir, `concat_${Date.now()}.txt`)

    Promise.all([
      fs.writeFile(chimeFile, chimeBuffer),
      fs.writeFile(ttsFile, ttsWavBuffer),
    ])
      .then(() => {
        // Create concat list for ffmpeg
        const concatList = `file '${chimeFile}'\nfile '${ttsFile}'`
        return fs.writeFile(concatListFile, concatList)
      })
      .then(() => {
        // Run ffmpeg to concatenate and convert to MP3 (Alexa-compatible)
        const ffmpeg = spawn("ffmpeg", [
          "-f",
          "concat",
          "-safe",
          "0",
          "-i",
          concatListFile,
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

        ffmpeg.stdout.on("data", (chunk) => {
          chunks.push(chunk)
        })

        ffmpeg.stderr.on("data", (data) => {
          // ffmpeg writes progress to stderr, usually safe to ignore
          console.log("ffmpeg:", data.toString())
        })

        ffmpeg.on("close", async (code) => {
          // Clean up temp files
          try {
            await Promise.all([
              fs.unlink(chimeFile),
              fs.unlink(ttsFile),
              fs.unlink(concatListFile),
            ])
          } catch (e) {
            console.error("Error cleaning up temp files:", e)
          }

          if (code !== 0) {
            reject(new Error(`ffmpeg exited with code ${code}`))
          } else {
            resolve(Buffer.concat(chunks))
          }
        })

        ffmpeg.on("error", (err) => {
          reject(err)
        })
      })
      .catch(reject)
  })
}
