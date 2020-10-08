const { Router } = require('express')
const passport = require("passport")
const upload = require('../../utils/multer')
const router = Router()
const { createSchedule ,updateSchedule ,deleteSchedule } = require('../../controllers/apiControllers/scheduleApiControllers')


router.post("/add/schedule" ,  passport.authenticate('jwt', {session: false}), upload.array("image") , createSchedule)
router.patch("/update/schedule/:scheduleId" ,passport.authenticate('jwt', {session: false}), upload.array("image") , updateSchedule )
router.delete("/delete/schedule/:scheduleId",passport.authenticate('jwt', {session: false}), upload.array("image") , deleteSchedule)

module.exports = router