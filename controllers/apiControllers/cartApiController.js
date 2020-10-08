const Cart = require('../../models/Cart')
const Product = require('../../models/Products')
const Schedule = require('../../models/Schedule')
module.exports = {
    async addToCart(req, res){
        const userId = req.user.id
        const {productId} = req.params
        try{
            const pro = await Product.findOne({_id: productId})
            const sch = await Schedule.findOne({_id: productId})
            let orderTotal = null
            if(pro){
                orderTotal = pro.price
            }
            if(sch){
                orderTotal = sch.price
            }
            const check =  await Cart.findOne({productId, userId})
            if(check) return res.json({statusCode: 400, message: 'Product Already present in the cart'})
            await Cart.create({ userId, productId, orderTotal })
            return res.status(201).json({ statusCode: 201, message: 'Item Added To Cart Successfully' })
        }catch(err){
            console.log(err)
            return res.json({ statusCode: 400, message: 'Bad request' })
        }
    },

    async quantityIncrement(req,res) {
        try{
            const { productId } = req.params;
            const userId = req.user.id;
            const pPrice = await Product.findOne({_id: productId})
            const tPrice = await Schedule.findOne({_id: productId})
            let proPrice = null
            let tickPrice = null
            if(pPrice){
                proPrice = pPrice.price
            }
            if(tPrice){
                tickPrice = tPrice.price
            }
            if(proPrice!== null){
                await Cart.updateOne({userId, productId}, {$inc: {quantity: 1, orderTotal: proPrice }})
            }
            if(tickPrice!==null){
                await Cart.updateOne({userId, productId}, {$inc: {quantity: 1, orderTotal: tickPrice}})
            }
            return res.status(200).json({ statusCode: 200, message: 'QuantityUpdatedSuccessfully' })
        }catch(err){
            return res.status(400).json({ statusCode: 400, message: 'Bad request' })
        }
    },
    async quantityDecrement(req,res) {
        try{
            const { productId } = req.params;
            const userId = req.user.id;
            const eCart = await Cart.findOne({ userId, productId })
            const pPrice = await Product.findOne({_id: productId})
            const tPrice = await Schedule.findOne({_id: productId})
            let proPrice = null
            let tickPrice = null
            if(pPrice){
                proPrice = pPrice.price
            }
            if(tPrice){
                tickPrice = tPrice.price
            }
            if(eCart.quantity>1){
                if(proPrice!==null){
                    await Cart.updateOne({userId, productId}, {$inc: {quantity: -1, orderTotal: -proPrice }})
                }
                if(tickPrice!==null){
                    await Cart.updateOne({userId, productId}, {$inc: {quantity: -1, orderTotal: -proPrice }})
                }
                return res.status(200).json({ statusCode: 200, message: 'QuantityUpdatedSuccessfully' })
            }else{
                return res.status(401).json({ statusCode: 401, message: 'Quantity Cannot be less then one' })
            }
        }catch(err){
            return res.status(400).json({ statusCode: 400, message: 'Bad request' })
        }
    },

    async removeFromCart(req, res){
        const userId = req.user.id
        const {productId} = req.params
        try{
            await Cart.deleteOne({productId, userId})
            return res.json({ statusCode: 200, message: 'Item removed successfully' })
        }catch(err){
            return res.status(400).json({ statusCode: 400, message: 'Bad request' })
        }
    }
}