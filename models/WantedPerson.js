const mongoose = require('mongoose')

const WantedPersonSchema = new mongoose.Schema({
    fullName: String,
    description: String,
    image: String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    },
    lastSeen: String,
    status:{
        type:String,
        enum:['WANTED', 'FOUND', 'ARCHIVED'],
        default:'WANTED'
    }
})

module.exports = mongoose.model('WantedPerson', WantedPersonSchema)