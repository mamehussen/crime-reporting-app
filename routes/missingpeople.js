const express = require('express');
const router = express.Router()

const {
    getAllMissingPeople,
    getMissingPerson    
} = require('../controllers/missingpeople')

router.route('/').get(getAllMissingPeople)
router.route('/:id').get(getMissingPerson)


module.exports = router