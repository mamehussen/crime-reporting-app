const express = require('express');
const router = express.Router()

const {
    getAllMissingPeople,
    getMissingPerson,
    createMissingPerson,
    updateMissingPerson,
    deleteMissingPerson
} = require('../controllers/missingpeople')

router.route('/').post(createMissingPerson).get(getAllMissingPeople)
router.route('/:id').get(getMissingPerson).delete(deleteMissingPerson).patch(updateMissingPerson)


module.exports = router