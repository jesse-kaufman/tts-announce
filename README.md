# TTS Chime Service

Combines chime sounds with Piper TTS via Wyoming protocol. Returns Alexa-compatible MP3 audio (48 kbps, 22050 Hz, mono). Includes intelligent caching to avoid regenerating identical messages.

## Setup

### 1. Prepare Your Chimes

Create a folder with your chime MP3 files:
```
/your/chimes/folder/
  person.mp3
  notice.mp3
  warning.mp3
  reminder.mp3
```

Chimes can be MP3 or WAV format. The service will try `.mp3` first, then `.wav`.

### 2. Update docker-compose.yml

Edit `docker-compose.yml`:
- Change `/path/to/your/chimes` to your actual chimes folder
- Change `/path/to/cache` to where you want cached MP3s stored
- Change `PIPER_HOST=piper` to your Piper container name
- Change network name if needed
- Adjust `CACHE_TTL_HOURS` if you want different cache expiration (default: 24 hours)

### 3. Build and Run

```bash
docker-compose up -d
```

## Usage

### From Node-RED

Use an HTTP request node:

**Method:** POST  
**URL:** `http://tts-chime-service:3000/tts`  
**Content-Type:** application/json  

**Body:**
```json
{
  "text": "The front door is open",
  "chime_type": "warning",
  "cache": true
}
```

**Response:** MP3 audio file (combined chime + TTS)
**Headers:** 
- `X-Cache: HIT` if served from cache
- `X-Cache: MISS` if newly generated

### Cache Parameter

- `cache: true` (default) - Uses cached version if available
- `cache: false` - Always generates fresh audio, bypassing cache

### Available Chime Types

Whatever MP3/WAV files you put in your chimes folder. The service looks for `{chime_type}.mp3` first, then `{chime_type}.wav`.

If chime file not found, it tries `notice.mp3` then `notice.wav` as default. If that's not found, returns TTS only.

## Caching Behavior

The service caches generated MP3s based on a hash of `text + chime_type`:
- Same text + chime = instant cache hit (no Piper call needed)
- Cache files expire after `CACHE_TTL_HOURS` (default: 24 hours)
- Expired files are automatically deleted
- Set `cache: false` in request to force regeneration

## Node-RED Flow Example

1. **Inject/Trigger Node**
2. **Function Node** to prepare payload:
   ```javascript
   msg.payload = {
       text: "Your message here",
       chime_type: "person",
       cache: true  // optional, defaults to true
   };
   return msg;
   ```
3. **HTTP Request Node**:
   - Method: POST
   - URL: `http://tts-chime-service:3000/tts`
   - Return: binary buffer
4. **Function Node** to save file:
   ```javascript
   const timestamp = Date.now();
   msg.filename = `/share/www/announcement_${timestamp}.mp3`;
   return msg;
   ```
5. **File Out Node** to save the MP3
6. **Split to Alexa and Google paths**

### Playing to Alexa

Use `notify.alexa_notify` with SSML:
```json
{
  "service": "notify.alexa_notify",
  "data": {
    "message": "<audio src='https://your-public-url/announcement.mp3'/>"
  }
}
```

### Playing to Google

Use `media_player.play_media`:
```json
{
  "service": "media_player.play_media",
  "target": {
    "entity_id": "media_player.your_google_speaker"
  },
  "data": {
    "media_content_id": "http://homeassistant:8123/local/announcement.mp3",
    "media_content_type": "audio/mp3"
  }
}
```

## Environment Variables

- `PIPER_HOST` - Hostname/IP of Piper container (default: piper)
- `PIPER_PORT` - Wyoming protocol port (default: 10200)
- `CHIMES_DIR` - Directory containing chime files (default: /chimes)
- `CACHE_DIR` - Directory for cached MP3 files (default: /cache)
- `CACHE_TTL_HOURS` - Hours to keep cached files (default: 24)
- `PORT` - Service port (default: 3000)

## Troubleshooting

**"Connection refused to Piper"**
- Check Piper container name in docker-compose.yml
- Verify containers are on same network
- Test: `docker exec tts-chime-service ping piper`

**"Chime file not found"**
- Check volume mount path in docker-compose.yml
- Verify chime files exist
- Test: `docker exec tts-chime-service ls -la /chimes`

**Cache not working**
- Check cache directory permissions
- Test: `docker exec tts-chime-service ls -la /cache`
- Check logs: `docker logs tts-chime-service`

**"Audio sounds corrupted"**
- Check ffmpeg is installed: `docker exec tts-chime-service ffmpeg -version`
- Check logs: `docker logs tts-chime-service`

## Health Check

```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok"}`

## Cache Management

View cached files:
```bash
docker exec tts-chime-service ls -lh /cache
```

Clear cache:
```bash
docker exec tts-chime-service rm -rf /cache/*
```

Or map the cache directory to your host and manage files directly.

