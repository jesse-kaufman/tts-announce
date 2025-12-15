/* eslint-disable @typescript-eslint/no-magic-numbers */
/** @file PCM utilty functions. */

/**
 * Converts PCM audio to WAV format.
 * @param pcmData - PCM data to convert.
 * @param sampleRate - Sample rate to use in conversion.
 * @param channels - Channel count.
 * @param bitDepth - Bitrate for WAV file.
 * @returns Buffer.
 */
export const pcmToWav = (
  pcmData: Buffer,
  sampleRate = 22_050,
  channels = 1,
  bitDepth = 16
): Buffer => {
  const byteRate = sampleRate * channels * (bitDepth / 8)
  const blockAlign = channels * (bitDepth / 8)
  const dataSize = pcmData.length
  const headerSize = 44

  const buffer = Buffer.alloc(headerSize + dataSize)

  // RIFF header
  buffer.write("RIFF", 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write("WAVE", 8)

  // Fmt chunk
  buffer.write("fmt ", 12)
  buffer.writeUInt32LE(16, 16) // Fmt chunk size
  buffer.writeUInt16LE(1, 20) // Audio format (1 = PCM)
  buffer.writeUInt16LE(channels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(byteRate, 28)
  buffer.writeUInt16LE(blockAlign, 32)
  buffer.writeUInt16LE(bitDepth, 34)

  // Data chunk
  buffer.write("data", 36)
  buffer.writeUInt32LE(dataSize, 40)
  pcmData.copy(buffer, 44)

  return buffer
}

export default pcmToWav
