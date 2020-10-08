const { hash } = require('bcryptjs')
const Admin = require('../../models/Admin')
const User = require('../../models/Users')
const Manager = require('../../models/Management')

module.exports = {

    async commonLogin(req, res){
        try{
            const commenUser = req.user
            const accessToken = await commenUser.generateToken('login')
            return res.json({statusCode: 200, commenUser, accessToken: `JWT ${accessToken}`, expiresIn: '12h'})  
        }catch(err){
            return res.json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async renderForgotPasswordEmail(req, res){
        const { email } = req.body;
        try {
            // Ask for user details
            // No user. There is no user present in our database .. Kindly register first
            // 1. generateToken()
            // 2. Email sent successfully
            const admin = await Admin.findOne({ email })
            const manager = await Manager.findOne({ email })
            const user = await User.findOne({ email });
            // if(personalEmail){
            if(admin){
                await admin.generateToken("trainerReset")
                return res.json({ statusCode:200, message: 'Email sent successfully. Please Check your inbox' })
            }
            else if(manager){
                await manager.generateToken("trainerReset");
                return res.json({ statusCode: 200, message: 'Email sent successfully. Please Check your inbox' })
            }
            // }
            else if(user){
            await user.generateToken("reset");
            return res.json({ statusCode: 200, message: "Email sent successfully. Please Check your inbox" });
            }
            else{
            return res.json({ statusCode: 400, message: 'A valid Email is required'});
            }
        } catch (err) {
            return res.json({ statusCode: 500, message: 'Server Error' });
        }
    },
    
    async renderAllResetPassword(req, res){
        const { resetToken } = req.params
        const {newPassword, confirmPassword} = {...req.body}
        const hp = await hash(newPassword, 10)
        try {
            // Finding the user with the help of token
            const admin = await Admin.findOne( { resetToken } );
            const manager = await Manager.findOne( { resetToken } );
            const user = await User.findOne( { resetToken } );
            if(!newPassword || !confirmPassword) return res.json({ statusCode: 400, message: 'Password must not be empty' })
            if( newPassword !== confirmPassword )return res.json({ statusCode: 400, message: 'Password Do not match' })
            if(admin){
            await admin.updateOne({password: hp, resetToken: ""})
            admin.save()
            return res.status(200).json({ statusCode: 200, message: 'newPassword set successfully' })
            }
            else if(manager){
            await manager.updateOne({password: hp, resetToken: ""})
            manager.save()
            return res.status(200).json({ statusCode: 200, message: 'newPassword set successfully' })  
            } 
            else if(user){
            await user.updateOne({password: hp, resetToken: ""})
            user.save()
            return res.status(200).json({ statusCode: 200, message: 'newPassword set successfully' })
            }
            else{
                return res.json({ statusCode: 401, message: 'Unauthorize' })
            }
        } catch (err) {
            return res.json({ statusCode: 500, message: 'Server Error' });
        }
    },

    async renderChangePassword(req, res) {
        const role = req.user.role
        const { email, oldPassword, newPassword } = {...req.body}
        if (!email || !oldPassword || !newPassword) return res.status(400).json({ statusCode: 400, message: "Bad request"})
        try{
            const hp = await hash(newPassword, 10)
            if (role === 'User'){
            const user = await User.findByEmailAndPassword(email, oldPassword)    
            await user.updateOne({ password: hp })
            return res.status(200).json({ statusCode: 200, message: 'Password Changed successfully'})
            }
            if(role === 'Manager'){
            const manager = await Manager.findByEmailAndPassword(email, oldPassword)    
            await manager.updateOne({ password: hp })
            return res.status(200).json({ statusCode: 200, message: 'Password Changed successfully'})
            }
            if(role === 'Admin'){
            const admin = await Admin.findByEmailAndPassword(email, oldPassword)    
            await admin.updateOne({ password: hp })
            return res.status(200).json({ statusCode: 200, message: 'Password Changed successfully'})
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    
    async commonLogOut(req, res){
        try{
            const commenUser = req.user
            await commenUser.updateOne({accessToken: ""})
            commenUser.save()
            return res.status(200).json({statusCode: 200, message: 'LogOut Successfully'})  
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    
    async renderConfirmEmail(req, res){
        const { confirmToken } = req.params;
        try {
        // Finding the user with the help of token
        const user = await User.findOne({ confirmToken });
        const manager = await Manager.findOne({ confirmToken });
        if(user){
            await user.updateOne({ isConfirm: true, confirmToken: "" })
            return res.status(200).json({ statusCode: 200, message: 'Email Confirmed successfully...!!! You can log in now' })
        }
        if(manager){
            await manager.updateOne({ isConfirm: true, confirmToken: "" })
            return res.status(200).json({ statusCode: 200, message: 'Email Confirmed successfully...!!! You can log in now' })
        }
        } catch (err) {
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
}