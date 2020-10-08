const User = require('../../models/Users')
const Order = require('../../models/Order')
const Product = require('../../models/Products')
const Schedule = require('../../models/Schedule')

module.exports = {
    async getUserProfile(req, res){
        try{
            return res.json( { user: req.user })
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async fetchGooglePofile(req, res){
        try{
            const user = req.user
            const accessToken = await user.generateToken('login')
            return res.json( {statusCode: 200 , commenUser:user, accessToken: `JWT ${accessToken}` , expiresIn: '12h'} )    
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async fetchfacebookPofile(req, res){
        try{
            const user = req.user
            const accessToken = await user.generateToken('login')
            return res.json( {statusCode: 200 , commenUser:user, accessToken: `JWT ${accessToken}` , expiresIn: '12h'} )    
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async renderConfirmEmail(req, res) {
        const { confirmToken } = req.params;
        try {
          // Finding the user with the help of token
            const user = await User.findOne({ confirmToken });
            if (!user) return res.status(401).send("Invalid Credentials")
            await user.updateOne({ isConfirm: true, confirmToken: "" })
            return res.status(200).json({ statusCode: 200, message: 'Email Confirmed successfully...!!! You can log in now' })
        } catch (err) {
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async getUserOrders(req,res){
        try{
            const userId = req.user._id
            const orders = await Order.find({userId})
            let userOrders = []
            for (const property in orders) {
                if(orders){
                    console.log(property)
                    let productId = orders[property].productId
                    const product = await Product.findOne({_id:productId})
                    const schedule = await Schedule.findOne({_id:productId})

                    if(product){
                        const { productName , image } = product
                        const { quantity , order_value } = orders[property]
                        const obj = {productName,image,quantity, order_value, type: 'product' }
                        userOrders.push(obj)
                    }
                    if(schedule){
                        const { matchDate , matchPlace ,team1,team2,team1ImageUrl, team2ImageUrl } = schedule
                        const { quantity ,order_value } = orders[property]
                        const obj = { matchDate,  team1,team2,matchPlace,  team1ImageUrl, team2ImageUrl,order_value, quantity, type: 'schedule' }
                        userOrders.push(obj)
                    }
                }
            }
            return res.status(200).json({ statusCode: 200, userOrders })

        }catch(err){
            console.log(err)
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}