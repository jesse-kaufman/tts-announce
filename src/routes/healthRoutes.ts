/** @file Health routes. */
import { Router } from "express"
import checkHealth from "#controllers/health"

const healthRoutes = Router()

// Health check endpoint
healthRoutes.get("/", checkHealth)

export default healthRoutes
