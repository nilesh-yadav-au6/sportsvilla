const mongoose = require('mongoose')
const Schema = mongoose.Schema
const scheduleSchema = new Schema({
    matchDate: {
        type: String,
        required: true,
        trim: true
    },
    matchType: {
        type: String,
        required: true,
        trim: true
    },
    matchPlace: {
        type: String,
        required: true,
        trim: true
    },
    team1: {
        type: String,
        required: true,
        trim: true
    },
    team2: {
        type: String,
        required: true,
        trim: true
    },
    team1ImageUrl:{
        type:String,
        required:true,
    },
    team2ImageUrl:{
        type:String,
        required:true,
    },
    ticket:{
        type:String,
        required:true
    },
    capacity:{
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default:true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }
},
{timestamps: true})


const Schedule = mongoose.model('schedules', scheduleSchema)
module.exports = Schedule