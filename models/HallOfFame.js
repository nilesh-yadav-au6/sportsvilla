const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    battingStyle: {
        type: String,
        required: true,
        trim: true
    },
    bowlingStyle:{
        type: String,
        required: true,
        trim: true
    },
    speciality: {
        type: String,
        required: false,
        trim: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    career:{
        type:String,
        default:false
    },
    testRuns: {
        type: Number,
        required: false,
        trim: true
    },
    odiRuns: {
        type: Number,
        required: false,
        trim: true
    },
    hundreds: {
        type: String,
        required: false,
        trim: true
    },
    debut: {
        type: String,
        required: false,
        trim: true
    },
    playerBio: {
        type: String,
        required: false,
        trim: true
    },
    inducted: {
        type: String,
        required: false,
        trim: true
    },
    image:{
        type: String,
        required: false,
        trim: true
    }
},
{timestamps: true})


const Player = mongoose.model('hofPlayer', playerSchema)
module.exports = Player