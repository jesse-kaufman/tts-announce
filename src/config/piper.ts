/** @file Configuration for connecting to Piper service. */

/** Hostname or IP address for Piper service. */
export const PIPER_HOST: string = process.env.PIPER_HOST || "piper"

/** TCP port for Piper service. */
export const PIPER_PORT = Number(process.env.PIPER_PORT || 10_200)

/** Time in milliseconds before considering a Piper request to be timed-out. */
export const PIPER_TIMEOUT = Number(process.env.PIPER_TIMEOUT || 30_000)
