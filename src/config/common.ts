/** @file Configuration options. */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing,@typescript-eslint/no-magic-numbers */
import dotenv from "dotenv"

/** Shorthand for process.env.NODE_ENV. */
// eslint-disable-next-line import/exports-last
export const NODE_ENV = process.env.NODE_ENV || "production"

// Get vars from env file based on environment.
// - Production: .env
// - Testing: .env.test
// - Development: .env.development
dotenv.config({
  path: NODE_ENV === "production" ? ".env" : `.env.${NODE_ENV}`,
  quiet: true,
})

/** Whether or not environment is development. */
export const IS_DEV: boolean = NODE_ENV === "development"

/** API URL prefix. */
export const API_PREFIX: string = process.env.API_PREFIX || `/api/v1`

/** Default port for API. */
export const PORT = Number(process.env.PORT || 3000)

/** Log level for logging; defaults to "info". */
export const LOG_LEVEL: string = process.env.LOG_LEVEL || "info"

export const PIPER_HOST: string = process.env.PIPER_HOST || "piper"
// eslint-disable-next-line unicorn/numeric-separators-style
export const PIPER_PORT = Number(process.env.PIPER_PORT || 10200)
export const CHIMES_DIR: string = process.env.CHIMES_DIR || "/chimes"
export const CACHE_DIR: string = process.env.CACHE_DIR || "/cache"
export const CACHE_TTL_HOURS = Number(process.env.CACHE_TTL_HOURS || "24")
export const PIPER_TIMEOUT = Number(process.env.PIPER_TIMEOUT || 30_000)
