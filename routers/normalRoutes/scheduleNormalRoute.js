const { Router } = require('express')
const router = Router()

const { getSingleSchedule , getAllSchedule, getCurrentMatch, getmatchDtaeSchedule } = require("../../controllers/normalControllers/shceduleNormalController")


router.get("/singleschedule/:scheduleId" , getSingleSchedule)
router.get('/all/schedule' , getAllSchedule)
router.get('/todayMatch/:matchDate', getCurrentMatch)
router.get('/searchDate', getmatchDtaeSchedule)

module.exports = router