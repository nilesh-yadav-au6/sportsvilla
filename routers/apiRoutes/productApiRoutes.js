const passport = require('passport')
const { Router } = require('express')
const router = Router()
const upload = require('../../utils/multer')
const { addSVProduct, updateSVProduct, deleteSVProducts } = require('../../controllers/apiControllers/productApiControllers')

router.post('/add/product', passport.authenticate('jwt', {session: false}), upload.single("image"), addSVProduct)
router.patch('/update/product/:productId', passport.authenticate('jwt', {session: false}), upload.single("image"), updateSVProduct)
router.delete('/delete/product/:productId', passport.authenticate('jwt', {session: false}), deleteSVProducts)

module.exports = router