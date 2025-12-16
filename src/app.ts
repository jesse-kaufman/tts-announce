/** @file Express bootstrapping. */
import express from "express"
import getAudio from "#controllers/audio"
import checkHealth from "#controllers/health"

const app = express()
app.use(express.json())

// API endpoint
app.post("/audio", getAudio)

// Health check endpoint
app.get("/health", checkHealth)

export default app
