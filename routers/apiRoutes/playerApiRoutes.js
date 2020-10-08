const passport = require('passport')
const { Router } = require('express')
const router = Router()
const upload = require('../../utils/multer')
const { addPlayer ,updatePlayer , deletePlayer, updateAuctionPlayer, updatefalseAuctionPlayer } = require('../../controllers/apiControllers/playerApiContollers')

router.post('/add/player', passport.authenticate('jwt', {session: false}), upload.single("image"), addPlayer)
router.patch('/update/player/:playerId', passport.authenticate('jwt', {session: false}), upload.single("image"), updatePlayer)
router.delete('/delete/player/:playerId', passport.authenticate('jwt', {session: false}), upload.single("image"), deletePlayer)
router.patch('/updatetrueAuction/:playerId', passport.authenticate('jwt', {session: false}), updateAuctionPlayer)
router.patch('/updatefalseAuction/:playerId', passport.authenticate('jwt', {session: false}), updatefalseAuctionPlayer)

module.exports = router