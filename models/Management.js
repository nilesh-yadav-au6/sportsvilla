const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { compare }= require('bcryptjs')
const { hasingPassword, confirmationToken } = require('../utils/schemaRelated')
const { stringify } = require('uuid')
const mangSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    teamName: {
        type: String,
        required: true,
        trim: true
    },
    auction:{
        type:String,
        default:null
    },
    manager: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    personalEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    accessToken:{
        type: String,
        trim: true
    },
    teamImage:{
        type: String,
        trim: true,
        require: true
    },
    confirmToken:{
        type: String,
        trim: true
    },
    resetToken:{
        type: String,
        trim: true
    },
    isConfirm:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        default: 'Manager',
        require: true
    }
},
{timestamps: true})

mangSchema.pre('save', hasingPassword)
mangSchema.methods.generateToken = confirmationToken
mangSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const manager = await Manager.findOne({email: email})
        if(!manager) throw new Error('Invalid Credentials')
        const isMatched = await compare(password, manager.password)
        if(!isMatched) throw new Error('Invalid Credentials')
        return manager
    }catch(err){
        err.name = 'authError'
        throw err
    }
}

mangSchema.methods.toJSON = function(){
    const manager = this.toObject()
    delete manager.password
    delete manager.accessToken
    delete manager.__v
    return manager
}


const Manager = mongoose.model('managers', mangSchema)
module.exports = Manager