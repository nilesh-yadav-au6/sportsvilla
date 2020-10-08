const Player = require('../../models/Player')
const cloudinary = require('../../utils/coludinary')
const convertBufferToString = require('../../utils/convertBufferToString')

module.exports = {
    async addPlayer(req, res){
        try{
            if(req.user.role === 'Admin'){
                const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                const imageResponse = await cloudinary.uploader.upload(imageContent)
                const avatar = imageResponse.secure_url || req.body.image
                const adminId = req.user._id
                const { name, age, country, battingStyle, bowlingStyle, speciality,basePrice ,description, soldTeam } = req.body
                if (!name || !age || !country || !battingStyle || !bowlingStyle || !speciality || !basePrice || !avatar || !description || !adminId) {
                    return res.json({ statusCode: 400, message: "Bad request" });
                }
                const player = await Player.create({ name, age, country, battingStyle, bowlingStyle, speciality, basePrice ,avatar ,description ,adminId, soldPrice: basePrice, soldTeam });
                return res.status(201).json({statusCode: 201, player})
            }
            else{
                return res.json({statusCode: 400, message: 'Only Admin Can Add Players'})
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async updatePlayer(req,res){
        try{
            if(req.user.role === 'Admin'){
                let avatar;;
                if(req.file !== undefined){
                    const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                    const imageResponse = await cloudinary.uploader.upload(imageContent)
                    avatar = imageResponse.secure_url
                }
                const { playerId } = req.params
                const { name, age, country, battingStyle, bowlingStyle, speciality,basePrice ,description, soldTeam } = req.body;
                const player = await Player.findOne({_id:playerId})
                if(!player) return res.status(400).json({ statusCode: 400, message: 'No Such Player Exists'})
                if( name || age || country || battingStyle || bowlingStyle || speciality || basePrice || description || avatar|| soldTeam){
                    if(name) await player.updateOne({ name })
                    if(age) await player.updateOne({ age })
                    if(country) await player.updateOne({ country })
                    if(battingStyle) await player.updateOne({ battingStyle })
                    if(bowlingStyle) await player.updateOne({ bowlingStyle })
                    if(speciality) await player.updateOne({ speciality })
                    if(basePrice) await player.updateOne({ basePrice })
                    if(description) await player.updateOne({ description })
                    if(avatar) await player.updateOne({ avatar })
                    if(soldTeam) await player.updateOne({ soldTeam })
                }
                return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async updateAuctionPlayer(req,res){
        try{
            if(req.user.role === 'Admin'){
                const { playerId } = req.params
                if(!playerId) return res.status(400).json({ statusCode: 400, message: 'No Such Player Exists'})
                if( playerId ){
                    await Player.updateOne({_id: playerId},{$set: {currentAuction: true}})
                    return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });
                }
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    
    async updatefalseAuctionPlayer(req,res){
        try{
            if(req.user.role === 'Admin'){
                const { playerId } = req.params
                if(!playerId) return res.status(400).json({ statusCode: 400, message: 'No Such Player Exists'})
                if( playerId ){
                    await Player.updateOne({_id: playerId},{$set: {currentAuction: false}})
                    return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });
                }
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async deletePlayer(req, res) {
        try {
            const { playerId } = req.params;
            await Player.findByIdAndDelete({ _id: playerId });
            return res
            .status(200)
            .json({ statusCode: 200, message: "Deleted Sucseesfully" });
        } catch (err) {
            return res.status(500).json({ statusCode: 500, message: "Server Error" });
        }
    },
}
