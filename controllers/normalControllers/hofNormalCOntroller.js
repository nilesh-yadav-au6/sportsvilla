const Player = require('../../models/HallOfFame')

module.exports = {
    async getAllPlayerHOF (req,res){
        try{
            const { page ,size } = req.query
            const players = await Player.find({}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1))
            if(!players) return res.json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, players})

        }catch(err){
            console.log(err)
            return res.json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async getSinglePlayerHOF(req,res){
        try{
            const { playerId } =req.params
            const player = await Player.findOne({_id: playerId})
            if(!player) return res.json({ statusCode: 400, message: 'No such player'})
            return res.status(200).json({ statusCode: 200, player})

    }catch(err){
        return res.json({ statusCode: 500, message: 'Server Error' })
    }
    }
}