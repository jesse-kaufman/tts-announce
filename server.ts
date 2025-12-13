import express from "express"
import net from "net"
const fs = require("fs").promises
import path from "path"
import { spawn } from "child_process"
import { promisify } from "util"
import { pipeline } from "stream"
import crypto from "crypto"
const streamPipeline = promisify(pipeline);

const app = express();
app.use(express.json());

const PIPER_HOST = process.env.PIPER_HOST || 'piper';
const PIPER_PORT = process.env.PIPER_PORT || 10200;
const CHIMES_DIR = process.env.CHIMES_DIR || '/chimes';
const CACHE_DIR = process.env.CACHE_DIR || '/cache';
const CACHE_TTL_HOURS = parseInt(process.env.CACHE_TTL_HOURS || '24', 10);
const PORT = process.env.PORT || 3000;

// Ensure cache directory exists
fs.mkdir(CACHE_DIR, { recursive: true }).catch(console.error);

// Generate cache key from text and chime type
function getCacheKey(text, chimeType) {
    const hash = crypto.createHash('sha256');
    hash.update(`${text}:${chimeType}`);
    return hash.digest('hex');
}

// Check if cached file exists and is not expired
async function getCachedFile(cacheKey) {
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`);
    
    try {
        const stats = await fs.stat(cachePath);
        const ageHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);
        
        if (ageHours < CACHE_TTL_HOURS) {
            console.log(`Cache hit: ${cacheKey} (age: ${ageHours.toFixed(2)}h)`);
            return cachePath;
        } else {
            console.log(`Cache expired: ${cacheKey} (age: ${ageHours.toFixed(2)}h)`);
            // Delete expired file
            await fs.unlink(cachePath).catch(() => {});
            return null;
        }
    } catch (err) {
        // File doesn't exist
        return null;
    }
}

// Save MP3 to cache
async function saveCachedFile(cacheKey, mp3Buffer) {
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.mp3`);
    await fs.writeFile(cachePath, mp3Buffer);
    console.log(`Cached: ${cacheKey}`);
    return cachePath;
}

// Wyoming protocol client for Piper TTS
async function getPiperAudio(text) {
    return new Promise((resolve, reject) => {
        const client = net.createConnection({ host: PIPER_HOST, port: PIPER_PORT }, () => {
            console.log('Connected to Piper');
            
            // Send synthesize request
            const request = {
                type: 'synthesize',
                data: {
                    text: text
                }
            };
            
            client.write(JSON.stringify(request) + '\n');
        });

        let audioChunks = [];
        let buffer = Buffer.alloc(0);
        let expectingAudio = false;
        let currentPayloadLength = 0;

        client.on('data', (data) => {
            buffer = Buffer.concat([buffer, data]);

            while (buffer.length > 0) {
                if (!expectingAudio) {
                    // Look for newline to parse JSON event
                    const newlineIndex = buffer.indexOf('\n');
                    if (newlineIndex === -1) break; // Need more data

                    const line = buffer.slice(0, newlineIndex).toString('utf-8');
                    buffer = buffer.slice(newlineIndex + 1);

                    try {
                        const event = JSON.parse(line);
                        console.log('Received event:', event.type);

                        if (event.type === 'audio-chunk' && event.payload_length) {
                            expectingAudio = true;
                            currentPayloadLength = event.payload_length;
                        } else if (event.type === 'audio-stop') {
                            // Done receiving audio
                            client.end();
                            const audioBuffer = Buffer.concat(audioChunks);
                            resolve(audioBuffer);
                            return;
                        }
                    } catch (e) {
                        console.error('Error parsing event:', e);
                    }
                } else {
                    // Reading audio payload
                    if (buffer.length >= currentPayloadLength) {
                        const audioChunk = buffer.slice(0, currentPayloadLength);
                        audioChunks.push(audioChunk);
                        buffer = buffer.slice(currentPayloadLength);
                        expectingAudio = false;
                        currentPayloadLength = 0;
                    } else {
                        break; // Need more data
                    }
                }
            }
        });

        client.on('error', (err) => {
            console.error('Piper connection error:', err);
            reject(err);
        });

        client.on('end', () => {
            console.log('Piper connection closed');
        });

        // Timeout after 30 seconds
        setTimeout(() => {
            client.destroy();
            reject(new Error('Piper request timeout'));
        }, 30000);
    });
}

// Convert raw PCM to WAV format
function pcmToWav(pcmData, sampleRate = 22050, channels = 1, bitDepth = 16) {
    const byteRate = sampleRate * channels * (bitDepth / 8);
    const blockAlign = channels * (bitDepth / 8);
    const dataSize = pcmData.length;
    const headerSize = 44;
    
    const buffer = Buffer.alloc(headerSize + dataSize);
    
    // RIFF header
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataSize, 4);
    buffer.write('WAVE', 8);
    
    // fmt chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // fmt chunk size
    buffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
    buffer.writeUInt16LE(channels, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(byteRate, 28);
    buffer.writeUInt16LE(blockAlign, 32);
    buffer.writeUInt16LE(bitDepth, 34);
    
    // data chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataSize, 40);
    pcmData.copy(buffer, 44);
    
    return buffer;
}

// Use ffmpeg to concatenate audio files and convert to MP3
async function concatenateAndConvertToMP3(chimeBuffer, ttsWavBuffer) {
    return new Promise((resolve, reject) => {
        // Write temp files
        const tmpDir = '/tmp';
        const chimeFile = path.join(tmpDir, `chime_${Date.now()}.tmp`);
        const ttsFile = path.join(tmpDir, `tts_${Date.now()}.wav`);
        const concatListFile = path.join(tmpDir, `concat_${Date.now()}.txt`);
        
        Promise.all([
            fs.writeFile(chimeFile, chimeBuffer),
            fs.writeFile(ttsFile, ttsWavBuffer)
        ]).then(() => {
            // Create concat list for ffmpeg
            const concatList = `file '${chimeFile}'\nfile '${ttsFile}'`;
            return fs.writeFile(concatListFile, concatList);
        }).then(() => {
            // Run ffmpeg to concatenate and convert to MP3 (Alexa-compatible)
            const ffmpeg = spawn('ffmpeg', [
                '-f', 'concat',
                '-safe', '0',
                '-i', concatListFile,
                '-ar', '22050',  // Sample rate for Alexa
                '-ac', '1',      // Mono
                '-c:a', 'libmp3lame',
                '-b:a', '48k',   // Bitrate for Alexa
                'pipe:1'
            ]);

            const chunks = [];
            
            ffmpeg.stdout.on('data', (chunk) => {
                chunks.push(chunk);
            });

            ffmpeg.stderr.on('data', (data) => {
                // ffmpeg writes progress to stderr, usually safe to ignore
                console.log('ffmpeg:', data.toString());
            });

            ffmpeg.on('close', async (code) => {
                // Clean up temp files
                try {
                    await Promise.all([
                        fs.unlink(chimeFile),
                        fs.unlink(ttsFile),
                        fs.unlink(concatListFile)
                    ]);
                } catch (e) {
                    console.error('Error cleaning up temp files:', e);
                }

                if (code !== 0) {
                    reject(new Error(`ffmpeg exited with code ${code}`));
                } else {
                    resolve(Buffer.concat(chunks));
                }
            });

            ffmpeg.on('error', (err) => {
                reject(err);
            });
        }).catch(reject);
    });
}

// API endpoint
app.post('/tts', async (req, res) => {
    try {
        const { text, chime_type = 'notice', cache = true } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'text is required' });
        }

        console.log(`Generating TTS for: "${text}" with chime: ${chime_type}, cache: ${cache}`);

        // Check cache if enabled
        let mp3Buffer;
        let cachePath = null;
        
        if (cache) {
            const cacheKey = getCacheKey(text, chime_type);
            cachePath = await getCachedFile(cacheKey);
            
            if (cachePath) {
                // Return cached file
                mp3Buffer = await fs.readFile(cachePath);
                res.set('Content-Type', 'audio/mpeg');
                res.set('X-Cache', 'HIT');
                return res.send(mp3Buffer);
            }
        }

        // Get TTS audio from Piper
        const piperAudio = await getPiperAudio(text);
        console.log(`Received ${piperAudio.length} bytes from Piper`);

        // Convert PCM to WAV
        const ttsWav = pcmToWav(piperAudio);

        // Load chime file (try .mp3 first, then .wav)
        let chimePath = path.join(CHIMES_DIR, `${chime_type}.mp3`);
        let chimeBuffer;
        
        try {
            chimeBuffer = await fs.readFile(chimePath);
        } catch (err) {
            // Try WAV format
            try {
                chimePath = path.join(CHIMES_DIR, `${chime_type}.wav`);
                chimeBuffer = await fs.readFile(chimePath);
            } catch (err2) {
                console.warn(`Chime file not found: ${chime_type}.mp3 or .wav, trying default`);
                try {
                    chimeBuffer = await fs.readFile(path.join(CHIMES_DIR, 'notice.mp3'));
                } catch (err3) {
                    try {
                        chimeBuffer = await fs.readFile(path.join(CHIMES_DIR, 'notice.wav'));
                    } catch (err4) {
                        console.warn('No chime files found, returning TTS only');
                        // Convert TTS WAV to MP3 (Alexa-compatible) and return
                        mp3Buffer = await new Promise((resolve, reject) => {
                            const ffmpeg = spawn('ffmpeg', [
                                '-f', 'wav',
                                '-i', 'pipe:0',
                                '-ar', '22050',  // Sample rate for Alexa
                                '-ac', '1',      // Mono
                                '-c:a', 'libmp3lame',
                                '-b:a', '48k',   // Bitrate for Alexa
                                'pipe:1'
                            ]);

                            const chunks = [];
                            ffmpeg.stdout.on('data', (chunk) => chunks.push(chunk));
                            ffmpeg.on('close', (code) => {
                                if (code === 0) resolve(Buffer.concat(chunks));
                                else reject(new Error('ffmpeg failed'));
                            });
                            ffmpeg.stdin.write(ttsWav);
                            ffmpeg.stdin.end();
                        });

                        // Save to cache if enabled
                        if (cache) {
                            const cacheKey = getCacheKey(text, chime_type);
                            await saveCachedFile(cacheKey, mp3Buffer);
                        }

                        res.set('Content-Type', 'audio/mpeg');
                        res.set('X-Cache', 'MISS');
                        return res.send(mp3Buffer);
                    }
                }
            }
        }

        // Concatenate chime + TTS and convert to MP3
        mp3Buffer = await concatenateAndConvertToMP3(chimeBuffer, ttsWav);

        // Save to cache if enabled
        if (cache) {
            const cacheKey = getCacheKey(text, chime_type);
            await saveCachedFile(cacheKey, mp3Buffer);
        }

        // Return combined audio as MP3
        res.set('Content-Type', 'audio/mpeg');
        res.set('X-Cache', 'MISS');
        res.send(mp3Buffer);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`TTS Chime Service running on port ${PORT}`);
    console.log(`Piper: ${PIPER_HOST}:${PIPER_PORT}`);
    console.log(`Chimes directory: ${CHIMES_DIR}`);
    console.log(`Cache directory: ${CACHE_DIR}`);
    console.log(`Cache TTL: ${CACHE_TTL_HOURS} hours`);
});
