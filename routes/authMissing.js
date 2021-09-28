const express = require('express');
const router = express.Router()

const {
    createMissingPerson,
    updateMissingPerson,
    deleteMissingPerson
} = require('../controllers/missingpeople')

router.route('/').post(createMissingPerson)
router.route('/:id').delete(deleteMissingPerson).patch(updateMissingPerson)


module.exports = router