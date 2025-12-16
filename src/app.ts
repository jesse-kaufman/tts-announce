/** @file Express bootstrapping. */
import express from "express"
import getAnnouncement from "#controllers/announce"
import checkHealth from "#controllers/health"

const app = express()
app.use(express.json())

// API endpoint
app.post("/announce", getAnnouncement)

// Health check endpoint
app.get("/health", checkHealth)

export default app
