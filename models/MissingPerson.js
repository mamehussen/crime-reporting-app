const mongoose = require('mongoose')

const MissingPersonSchema = new mongoose.Schema({
    fullName: String,
    description: String,
    image: String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    },
    approvedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    tips: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tip'
    }],
    lastSeen: String,
    status:{
        type:String,
        enum:['MISSING', 'FOUND', 'ARCHIVED'],
        default:'MISSING'
    }

})

module.exports = mongoose.model('MissingPerson', MissingPersonSchema)