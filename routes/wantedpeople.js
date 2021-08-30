const express = require('express');
const router = express.Router()

const {
    getAllWantedPeople,
    getWantedPerson,
    createWantedPerson,
    updateWantedPerson,
    deleteWantedPerson
} = require('../controllers/wantedpeople')

router.route('/').post(createWantedPerson).get(getAllWantedPeople)
router.route('/:id').get(getWantedPerson).delete(deleteWantedPerson).patch(updateWantedPerson)


module.exports = router