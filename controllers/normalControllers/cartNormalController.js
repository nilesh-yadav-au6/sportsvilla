const Cart = require('../../models/Cart')
const Product = require('../../models/Products')
const Schedule = require('../../models/Schedule')

module.exports = {
    async getUserCart(req, res){
        try{
            const userId = req.user.id
            const cart = await Cart.find({userId})
            const arr = []
            for(let i=0; i<cart.length; i++){
                const pro = await Product.findOne({_id:cart[i]['productId']})
                const sch = await Schedule.findOne({_id:cart[i]['productId']})
                if(pro){
                    const { productName, brand, price, category, image } = pro
                    const { userId, productId, _id, orderTotal, quantity } = cart[i]
                    const obj = {productName, brand, price, category, image, userId, productId, _id, orderTotal, quantity, type: 'product' }
                    arr.push(obj)
                }
                if(sch){
                    const { matchDate, matchType, matchPlace, team1,team2, capacity, price, team1ImageUrl, team2ImageUrl } = sch
                    const { userId, productId, _id, orderTotal, quantity } = cart[i]
                    const obj = { matchDate, matchType, matchPlace, team1,team2, capacity, price, team1ImageUrl, team2ImageUrl,
                        userId, productId, _id, orderTotal, quantity, type: 'schedule' }
                    arr.push(obj)
                }
            }
            return res.status(200).json({ statusCode: 200, message: arr })
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    }
}