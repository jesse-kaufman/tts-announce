/** @file Configuration options. */
import dotenv from "dotenv"

/** API version for use in API prefix. */
const API_VERSION = process.env.API_VERSION || 1

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

/** API URL prefix. */
export const API_PREFIX = `${process.env.API_PREFIX || "/api"}/v${API_VERSION}`

/** Default port for API. */
export const PORT = Number(process.env.PORT || 3000)

/** Log level for logging; defaults to "info". */
export const LOG_LEVEL: string = process.env.LOG_LEVEL || "info"
