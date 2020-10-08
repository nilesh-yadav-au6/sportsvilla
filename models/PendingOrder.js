const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pendingOrderSchema = new Schema({
    amount: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        require: true
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    },
    currency: {
        type: String,
        default: 'INR'
    }
},
{timestamps: true})


const PendingOrder = mongoose.model('pendingOrder', pendingOrderSchema)
module.exports = PendingOrder