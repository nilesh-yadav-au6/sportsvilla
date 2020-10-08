const { hash } = require('bcryptjs')
const Manager = require('../../models/Management')
const Players = require('../../models/Player')
const cloudinary = require('../../utils/coludinary')
const convertBufferToString = require('../../utils/convertBufferToString')

module.exports = { 
    async registerManagement(req, res){
        try{
            if(req.user.role === 'Admin'){
                const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                const imageResponse = await cloudinary.uploader.upload(imageContent)
                const teamImage = imageResponse.secure_url || req.body.image
                const adminId  = req.user._id
                const checkE = req.user.personalEmail
                const { email, personalEmail, teamName, password, manager} = req.body;
                if(checkE === personalEmail) return res.json({statusCode: 401, message: 'Admin Cannot register himself as manager'})
                if (!email || !personalEmail || !teamName || !password || !adminId || !manager) {
                    return res.json({ statusCode: 400, message: "Bad request" });
                }
                const check = await Manager.findOne({email})
                if(check) return res.json({statusCode: 401, message: 'Bad request Email Already exist...!!!'})
                const mang = await Manager.create({ email, teamName, password, personalEmail,manager, adminId, teamImage });
                await mang.generateToken({mode:'trainerConfirm', email: email, password: password });
                return res.json({statusCode: 201, confirmation: 'Confrmation Email has been sent successfully please check your mail to confrim the Account.'});
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async deleteSVManagement (req, res){
        const { managerId } = req.params
        try{
            if(req.user.role === 'Admin'){
                const manager = await Manager.deleteOne({ _id: managerId })
                await Players.update({soldTeam: managerId},{$set: {soldTeam: null, soldTeamName: null}})
                if(!manager) { return res.status(400).json({ statusCode: 400, message: 'No Such management exist' }) }
                return res.status(200).json({ statusCode: 200, message: 'Management fired successfully' })
            }
        }catch(err){
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async updateManagement(req, res){
        try{
            if(req.user.role === 'Admin'){
                let teamImage;
                console.log()
                if(req.file !== undefined){
                    const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                    const imageResponse = await cloudinary.uploader.upload(imageContent)
                    teamImage = imageResponse.secure_url || req.body.image
                }
                const  { managerId } = req.params
                const { email, personalEmail, teamName, password, manager} = req.body;
                const manager1 = await Manager.findOne({_id:managerId})
                if(!manager1) return res.json({statusCode: 401, message: 'No such Manaegemet'})
                if( email || personalEmail || teamName || password || manager1 || teamImage ){
                    if(email) await manager1.updateOne({ email })
                    if(personalEmail && !password) return res.json({statusCode:400, message: "bad request"})
                    if(personalEmail){ 
                        await manager1.updateOne({ personalEmail })
                        await manager1.generateToken({mode:'trainerConfirm', email: email, password: password });
                    }
                    if(teamName) await manager1.updateOne({ teamName })
                    if(password){
                        const hp = await hash(password, 10)
                        await manager1.updateOne({ password: hp })
                    }    
                    if(manager) await manager1.updateOne({ manager })
                    if(teamImage) await manager1.updateOne({ teamImage })
                }
                return res.json({statusCode: 200, confirmation: 'Updation Email has been sent successfully please check your mail to confrim the Account.'});
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
}