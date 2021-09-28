const express = require('express');
const router = express.Router()

const {
    getAllWantedPeople,
    getWantedPerson
    
} = require('../controllers/wantedpeople')

router.route('/').get(getAllWantedPeople)
router.route('/:id').get(getWantedPerson)


module.exports = router