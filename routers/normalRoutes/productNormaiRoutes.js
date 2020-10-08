const { Router } = require('express')
const router = Router()

const { getSearchedProduct,
        getAllProduct,
        getSingleProduct,
        getCatProduct } = require('../../controllers/normalControllers/productNormalController')

router.get('/searchproduct',getSearchedProduct)
router.get('/all/product' , getAllProduct)
router.get('/single/product', getSingleProduct)
router.get('/product/category', getCatProduct)

module.exports = router