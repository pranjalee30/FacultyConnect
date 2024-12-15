import { Router } from "express";
import { addLocation, addStaff, addStatus, executeSearchQuery, getAllData, getTimetable, markAbsent } from "../controllers/staffControllers.js";
import verifyToken from '../middleware/verifyToken.js'

const router = Router()

router.get('/getStaff/:userid', verifyToken, getTimetable)
router.get('/all', getAllData)

router.post('/addstaff/:author', verifyToken, addStaff)
router.post('/addlocation/:timetableID/:dayID/:timeSlotID', verifyToken, addLocation)
router.post('/addstatus/:timetableID/:dayID/:timeSlotID', verifyToken, addStatus)
router.post('/search', executeSearchQuery)
router.post('/absent/:staffID/:dayID', markAbsent)

export default router;