const User = require('../../models/Users')
const { hash } = require('bcryptjs')
const { validationResult } = require('express-validator')
const cloudinary = require('../../utils/coludinary')
const convertBufferToString = require('../../utils/convertBufferToString')

module.exports = {
    async registerUser(req, res){
        try{
            const error = validationResult(req)
            if(!error.isEmpty()){
                return res.json({statusCode: 400, message: error.array()})
            }
            const { email, name, password } = req.body;
            if (!email || !name || !password) {
                return res.json({ statusCode: 400, message: "Bad request" });
            }
            const check = await User.findOne({email})
            if(check) return res.json({statusCode: 401, value: "", msg: 'Bad request Email Already exist :(', param: "unauthourize", location: "body"})
            const user = await User.create({ email, name, password });
            await user.generateToken('confirm');
            return res.json({statusCode: 201, confirmation: 'Confrmation Email has been sent successfully please check your mail to confrim the Account.'});
        }catch(err){
            return res.json({ statusCode: 500, message: 'Server Error'})
        }
    },

    async createUserPassword(req, res){
        const {email, newPassword, confirmPassword} = {...req.body}
        const hp =await hash(newPassword, 10)
        if (!email || !confirmPassword || !newPassword) return res.status(400).json({ statusCode: 400, message: "Bad request"})
        try{
            const user = await User.findOne({email: email})
            if (!user) return res.status(401).json({ statusCode: 401, message: "Incorrect credentials"})
            if(confirmPassword !== newPassword){
            return res.status(400).json({ statusCode: 400, message: 'Password Do not match'})
            }
            await user.updateOne({ password: hp, isConfirm: true })
            return res.status(200).json({ statusCode: 200, message: 'Password Created successfully'})
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async editProfileUser(req,res){
        try{
            if(req.user.role === 'User'){
                let profilePic;
                if(req.file !== undefined){
                    const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                    const imageResponse = await cloudinary.uploader.upload(imageContent)
                    profilePic = imageResponse.secure_url
                }
                const userId = req.user._id
                const { name } = req.body;
                console.log(name , profilePic)
                let user1 = await User.findOne({_id:userId})
                if(!user1) return res.status(400).json({ statusCode: 400, message: 'No Such User Exists'})
                if(  profilePic || name ){
                    if(profilePic) await user1.updateOne({ profilePic })
                    if(name) {
                        await user1.updateOne({ name })
                    }
                }
                const user = await User.findOne({_id:userId})
                return res.status(200).json({ statusCode: 200, message:user });
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}