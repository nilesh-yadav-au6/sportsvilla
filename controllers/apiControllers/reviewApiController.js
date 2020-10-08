const Review = require('../../models/Review');


module.exports = {
    async addReview (req,res){
        try{
            if(req.user.role === "User"){
                const userPic = req.user.profilePic
                const userName = req.user.name
                const { productId } = req.params
                const { review } = req.body
                if (!productId || !review || !userPic || !userName )  return res.json({ statusCode: 400, message: "Bad request" });
                const reviewCreate = await Review.create({ userPic , productId , review ,userName})
                return res.status(201).json({statusCode: 201, reviewCreate})
                }

        }catch(err){
            throw(err)
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async updateReview (req,res){
        try{
            if(req.user.role === "User"){
                const { reviewId } = await req.params
                const { review } = await req.body
                const reviewUpdate = await Review.findOne({_id:reviewId})
                if(!reviewUpdate) return res.status(400).json({ statusCode: 400, message: "Bad request" });
                if( reviewUpdate || stars){
                   if(reviewUpdate) await reviewUpdate.updateOne({ review })
                }
                return res.status(200).json({statusCode: 200, message: "Review Updated Successfully"})
            }

    }catch(err){
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
    },
    async deleteReview (req,res){
        try{
            if(req.user.role === "User"){
                const { reviewId } = req.params
                const deleteReview = await Review.findOne({_id:reviewId})
                if(!deleteReview) return res.status(400).json({ statusCode: 400, message: "No such review" });
                await deleteReview.deleteOne({_id:reviewId})
                return res.status(200).json({statusCode: 200, message:"Review Deleted Successfully"})
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}