const express = require('express');
const router = express.Router()

const {
    createWantedPerson,
    updateWantedPerson,
    deleteWantedPerson
} = require('../controllers/wantedpeople')

router.route('/').post(upload.single('photo'), createWantedPerson)
router.route('/:id').delete(deleteWantedPerson).patch(updateWantedPerson)


module.exports = router