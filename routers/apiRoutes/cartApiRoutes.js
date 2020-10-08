const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { addToCart,
        quantityIncrement,
        quantityDecrement,
        removeFromCart } = require('../../controllers/apiControllers/cartApiController')

router.post('/add/cart/:productId',  passport.authenticate('jwt', {session: false}), addToCart)
router.post('/increaseQuantity/:productId',  passport.authenticate('jwt', {session: false}), quantityIncrement)
router.post('/decrementQuantity/:productId',  passport.authenticate('jwt', {session: false}), quantityDecrement)
router.delete('/remove/cart/:productId', passport.authenticate('jwt', {session: false}), removeFromCart)
module.exports = router