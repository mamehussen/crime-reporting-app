const mongoose = require('mongoose')

const MissingPersonSchema = new mongoose.Schema({
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
    approvedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    lastSeen: String,
    status:{
        type:String,
        enum:['SUBMITTED','MISSING', 'FOUND', 'ARCHIVED'],
        default:'SUBMITTED'
    }

})

module.exports = mongoose.model('MissingPerson', MissingPersonSchema)