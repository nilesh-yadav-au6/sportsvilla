const passport = require('passport')
const { Router } = require('express')
const router = Router()
const upload = require('../../utils/multer')
const { registerManagement, deleteSVManagement, updateManagement } = require('../../controllers/apiControllers/managerApiControllers')

router.post('/add/management',passport.authenticate('jwt', {session: false}), upload.single("image"), registerManagement)
router.delete('/delete/management/:managerId', passport.authenticate('jwt', {session: false}), deleteSVManagement)
router.patch('/update/management/:managerId', passport.authenticate('jwt', {session: false}), upload.single("image"), updateManagement)

module.exports = router