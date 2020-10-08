const Schedule = require('../../models/Schedule')
module.exports = {
    async getSingleSchedule(req, res){
        try{
            const { scheduleId } = req.params
            const schedule = await Schedule.findOne({_id:scheduleId})
            if(!schedule) return res.status(400).json({ statusCode: 400, message: 'No Such Schedule' })
            if(schedule.capacity === 0){
                await schedule.updateOne({isAvailable:false})
            }
            return res.status(201).json({statusCode: 201, schedule});
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getAllSchedule(req,res){
        try{
            const { page ,size } =req.query
            const sche = await Schedule.find({})
            const schedule = await Schedule.find({}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1))
            if(!schedule) return res.status(400).json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, schedule, count: sche.length})

        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getCurrentMatch(req,res){
        try{
            const { matchDate } =req.params
            const schedule = await Schedule.find({matchDate})
            if(!schedule) return res.status(400).json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, schedule})

        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getmatchDtaeSchedule(req,res){
        try{
            const { page ,size, matchDate } =req.query
            console.log(matchDate)
            const sche = await Schedule.find({matchDate})
            const schedule = await Schedule.find({matchDate}).limit(parseInt(size)).skip(parseInt(size)*(parseInt(page)-1))
            if(!schedule) return res.status(400).json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, schedule, count: sche.length})

        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}