const passport = require('passport')
const { Router } = require('express')
const router = Router()
const upload = require('../../utils/multer')
const { addPHOFlayer ,updateHOFPlayer,deleteHOFPlayer   } = require('../../controllers/apiControllers/hallOfFameControllers')


router.post('/add/playerHOF', passport.authenticate('jwt', {session: false}), upload.single("image"), addPHOFlayer)
router.patch('/update/playerHOF/:playerId', passport.authenticate('jwt', {session: false}), upload.single("image"), updateHOFPlayer)
router.delete('/delete/playerHOF/:playerId', passport.authenticate('jwt', {session: false}), deleteHOFPlayer)

module.exports = router