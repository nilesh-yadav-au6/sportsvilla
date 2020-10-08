const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { createPendingOrder,
        getAllPendingOrder } = require('../../controllers/apiControllers/pendingOrderApiController')

router.post('/pendingOrder', passport.authenticate('jwt', {session: false}), createPendingOrder )
router.get('/allPendingOrder', passport.authenticate('jwt', {session: false}), getAllPendingOrder )
module.exports = router