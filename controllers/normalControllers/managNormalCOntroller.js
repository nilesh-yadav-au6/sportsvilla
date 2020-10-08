const Management = require('../../models/Management')
const Players = require('../../models/Player')

module.exports = {
    async getSingleManagement(req, res){
        try{
            const { managementId } = req.params
            const management = await Management.findOne({_id: managementId})
            const players = await Players.find({soldTeam: managementId})

            if(!management) return res.json({ statusCode: 400, message: 'No Such Management Found' })
            return res.status(201).json({statusCode: 200, management, players});
        }catch(err){
            return res.json({ statusCode: 500, message: 'Server Error' })
        }
    },

    async getAllManagement(req,res){
        try{
            const { page ,size } =req.query
            const mng = await Management.find({})
            const management = await Management.find({}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1))
            if(!management) return res.json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, management, count: mng.length})
        }catch(err){
            return res.json({ statusCode: 500, message: 'Server Error' })
        }
    }
}