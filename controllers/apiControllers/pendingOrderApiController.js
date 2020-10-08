const Pending = require('../../models/PendingOrder')


module.exports = {
    async createPendingOrder(req, res){
        try{
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, currency } = req.body
            if( !razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount || !currency  ) return res.json({statusCode: 400, message: 'BAD Request'})
            const Ord = Pending.create({...req.body})
            return res.json({statusCode: 200, message: Ord })
        }catch(err){
            res.json({statusCode: 500, message: 'Server Error' })
        }
    },

    async getAllPendingOrder(req, res){
        try{
            if(req.user.role === 'Admin'){
                const ord = await Pending.find({})
                return res.json({statusCode: 200, order: ord})
            }
            return res.json({statusCode: 400, message: 'Bad Request'})
        }catch(err){
            return res.json({statusCode: 500, message: 'Server Error'})
        }
    }
}