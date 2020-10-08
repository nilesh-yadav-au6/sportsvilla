const Admin = require('../../models/Admin')
const Management = require('../../models/Management')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')

module.exports = {
    async registerAdmin(req, res){
        try{
            const auction = uuidv4()
            const error = validationResult(req)
            if(!error.isEmpty()){
                return res.json({statusCode: 400, message: error.array()})
            }
            const { email, personalEmail, name, password } = req.body;
            if (!email || !personalEmail|| !name || !password) {
                return res.json({ statusCode: 400, message: "Bad request" });
            }
            const check = await Admin.findOne({email})
            if(check) return res.json({statusCode: 401, message: 'Bad request Email Already exist...!!!'})
            const admin = await Admin.create({ email, name, password, personalEmail ,auction });
            return res.json({statusCode: 201, admin});
        }catch(err){
            return res.json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async updateAuction (req,res){
        try{
            if(req.user.role === "Admin"){
                const auction = req.user.auction
                await Management.updateMany({}, {$set: {auction}}) 
                return res.json({statusCode: 201, message:"Success"});
            }
        }catch(err){
            return res.json({ statusCode: 500, message: 'Server Error' })
        }
    },
    
    async closeAuction (req,res){
        try{
            if(req.user.role === "Admin"){
                await Management.updateMany({}, {$set: {auction: null}}) 
                return res.json({statusCode: 201, message:"Success"});
            }else{
                return res.json({statusCode: 400, message:"Bad Request"});
            }
        }catch(err){
            return res.json({ statusCode: 500, message: 'Server Error' })
        }
    }
}