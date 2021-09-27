const mongoose = require('mongoose')

const AnonymousCrimeSchema = new mongoose.Schema({
    crimeType:{
        type:String,
        required:[true, 'Please select crime type'],
        enum: [
            'Theft', 'Assault', 'Fraud',
            'Injury', 'Threats', 'Traffic Collision',
            'Vandalism', 'Vehicle Robbery', 'Sexual Harrasement',
            'Break In'
        ]
    },
    description:String,
    address:String,
    status:{
        type:String,
        enum:['ACTIVE', 'ARCHIVED', 'SOLVED'],
        default:'ACTIVE'
    },
    images : [{
        path: String
    }],
    location:{
        type: {
            type: String, 
            enum: ['Point']
          },
          coordinates: {
            type: [Number]
          }
    }

}, {timestamps:true})

module.exports = mongoose.model('AnonymousCrime', AnonymousCrimeSchema)