/** @file API health controller. */
import { type RequestHandler } from "express"

// Health check endpoint
const getHealth: RequestHandler = (req, res) => {
  res.json({ status: "ok" })
}

export default getHealth
