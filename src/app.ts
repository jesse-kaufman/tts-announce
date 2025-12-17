/** @file Express bootstrapping. */
import express from "express"
import { API_PREFIX } from "#config"
import announceRoutes from "#routes/announceRoutes"
import healthRoutes from "#routes/healthRoutes"
import logger from "#utils/logger"

const app = express()
app.use(express.json())

const announceEndpoint = `${API_PREFIX}/announce`
app.use(announceEndpoint, announceRoutes)
logger.info(`Announce endpoint: ${announceEndpoint}`)

const healthEndpoint = `${API_PREFIX}/health`
app.use(healthEndpoint, healthRoutes)
logger.info(`Health endpoint: ${healthEndpoint}`)

export default app
