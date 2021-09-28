const mongoose = require('mongoose')

const CrimeSchema = new mongoose.Schema({
    crimeType: {
        type: String,
        required: [true, 'Please select crime type'],
        enum: [
            'Theft', 'Assault', 'Fraud',
            'Injury', 'Threats', 'Traffic Collision',
            'Vandalism', 'Vehicle Robbery', 'Sexual Harrasement',
            'Break In'
        ]
    },
    description: String,
    address: String,
    status: {
        type: String,
        enum: ['ACTIVE', 'ARCHIVED', 'SOLVED'],
        default: 'ACTIVE'
    },
    image: String,
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Crime', CrimeSchema)