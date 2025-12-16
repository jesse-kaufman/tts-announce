/** @file API health controller. */
import type { RequestHandler } from "express"

/**
 * Outputs healthcheck.
 * @param req - Request object.
 * @param res - Response object.
 */
const getHealth: RequestHandler = (req, res) => {
  res.json({ status: "ok" })
}

export default getHealth
