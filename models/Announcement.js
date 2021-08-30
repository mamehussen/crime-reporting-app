const mongoose = require('mongoose')

const AnnoucementSchema = new mongoose.Schema({
    announcementType: {
    type: String,
    enum: ['Normal', 'Urgent'],
    default: 'Normal'
    },
    title: {
        type: String,
        required: ['true', 'Please add a title']
    },
    content: {
        type: String,
        required: ['true', 'Please add a title']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }

}, {timestamps:true})

module.exports = mongoose.model('Announcement', AnnoucementSchema)