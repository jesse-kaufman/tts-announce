/** @file Announce routes. */
import { Router } from "express"
import getAnnouncement from "#controllers/announce"

const announceRoutes = Router()

// Main announce route
announceRoutes.post("/", getAnnouncement)

export default announceRoutes
