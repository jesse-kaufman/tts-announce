/** @file Express bootstrapping. */
import express from "express"
import checkHealth from "#controllers/health"
import generateAudio from "#controllers/generateAudio"

const app = express()
app.use(express.json())

// API endpoint
app.post("/generate-audio", generateAudio)

// Health check endpoint
app.get("/health", checkHealth)

export default app
