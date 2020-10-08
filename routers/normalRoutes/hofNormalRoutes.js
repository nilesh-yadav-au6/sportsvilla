const { Router } = require('express')
const passport = require('passport')
const router = Router()

const { getAllPlayerHOF, getSinglePlayerHOF} = require('../../controllers/normalControllers/hofNormalCOntroller')


router.get('/all/playerHOF', getAllPlayerHOF)
router.get('/single/playerHOF/:playerId', getSinglePlayerHOF)



module.exports = router