const mongoose = require('mongoose')

const MissingPersonSchema = new mongoose.Schema({

})

module.exports = mongoose.model('MissingPerson', MissingPersonSchema)