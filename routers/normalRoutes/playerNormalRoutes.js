const { Router } = require('express')
const router = Router()

const { getAllPlayer, getSinglePlayer, } = require('../../controllers/normalControllers/playerNormalContoller')


router.get('/all/player', getAllPlayer)
router.get('/single/player/:playerId', getSinglePlayer)


module.exports = router