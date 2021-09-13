const mongoose = require('mongoose')

const TipSchema = new mongoose.Schema({
    description: {
        type: String,
        required: ['true', 'Please add a description']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    missingPerson: {
        type:mongoose.Types.ObjectId,
        ref:'MissingPerson',
    },
    wantedPerson: {
        type:mongoose.Types.ObjectId,
        ref:'WantedPerson',
    }

}, {timestamps:true})

module.exports = mongoose.model('Tip', TipSchema)