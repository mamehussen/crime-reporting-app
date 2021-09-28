const mongoose = require('mongoose')

const WantedPersonSchema = new mongoose.Schema({
    fullName: String,
    description: String,
    image:{
        type: String,
        default: 'placeholder.jpg'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    },
    image: String,
    lastSeen: String,
    status:{
        type:String,
        enum:['WANTED', 'FOUND', 'ARCHIVED'],
        default:'WANTED'
    }
}, {timestamps:true})

module.exports = mongoose.model('WantedPerson', WantedPersonSchema)