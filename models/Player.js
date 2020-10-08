const mongoose = require('mongoose')
const Schema = mongoose.Schema
const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
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
    managementId: {
        type: Schema.Types.ObjectId,
        ref: "managers",
        required: false
    },
    basePrice: {
        type: Number,
        required: true,
        trim: true
    },
    soldPrice: {
        type: Number,
        required: false,
        trim: true
    },
    soldTeam: {
        type: String,
        required: false,
        trim: true
    },
    avatar: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    currentAuction: {
        type: Boolean,
        default: false
    },
    soldTeamName: {
        type: String,
        trim: true
    }
},
{timestamps: true})


const Player = mongoose.model('players', playerSchema)
module.exports = Player