const Player = require('../../models/HallOfFame')
const cloudinary = require('../../utils/coludinary')
const convertBufferToString = require('../../utils/convertBufferToString');
const { image } = require('../../utils/coludinary');

module.exports = {
    async addPHOFlayer(req, res){
        try{
            if(req.user.role === 'Admin'){
                const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                const imageResponse = await cloudinary.uploader.upload(imageContent)
                const image = imageResponse.secure_url || req.body.image
                const adminId = req.user._id
                const { name, dob, country, battingStyle, bowlingStyle, speciality, career , testRuns ,odiRuns , hundreds , debut, playerBio ,inducted} = req.body
                if (!name ||  !dob || !country  || !battingStyle || !bowlingStyle || !speciality || !career || !testRuns || !odiRuns || !hundreds || !debut || !playerBio || !inducted) {
                    return res.json({ statusCode: 400, message: "Bad request" });
                }
                const player = await Player.create({ name, dob, country, battingStyle, bowlingStyle, speciality, career , testRuns ,odiRuns , hundreds , debut, playerBio ,inducted,image,adminId});
                return res.status(201).json({statusCode: 201, player})
            }
            else{
                return res.json({statusCode: 400, message: 'Only Admin Can Add Players'})
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async updateHOFPlayer(req,res){
        try{
            if(req.user.role === 'Admin'){
                let image;;
                if(req.file !== undefined){
                    const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                    const imageResponse = await cloudinary.uploader.upload(imageContent)
                    image = imageResponse.secure_url
                }
                const { playerId } = req.params
                const { name, dob, country, battingStyle, bowlingStyle, speciality, career , testRuns ,odiRuns , hundreds , debut, playerBio ,inducted } = req.body;
                const player = await Player.findOne({_id:playerId})
                if(!player) return res.status(400).json({ statusCode: 400, message: 'No Such Player Exists'})
                if( !name ||  !dob || !country  || !battingStyle || !bowlingStyle || !speciality || !career || !testRuns || !odiRuns || !hundreds || !debut || !playerBio || !inducted){    
                    if(name) await player.updateOne({ name })
                    if(dob) await player.updateOne({ dob })
                    if(country) await player.updateOne({ country })
                    if(battingStyle) await player.updateOne({ battingStyle })
                    if(bowlingStyle) await player.updateOne({ bowlingStyle })
                    if(speciality) await player.updateOne({ speciality })
                    if(career) await player.updateOne({ career })
                    if(testRuns) await player.updateOne({ testRuns })
                    if(odiRuns) await player.updateOne({ odiRuns })
                    if(hundreds) {await player.updateOne({ hundreds })}
                    if(debut) await player.updateOne({ debut })
                    if(playerBio) await player.updateOne({ playerBio })
                    if(inducted) await player.updateOne({ inducted })
                    if(image) await player.updateOne({ image })
                }
                return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async deleteHOFPlayer(req, res) {
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
