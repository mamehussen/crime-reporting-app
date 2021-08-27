const express = require('express');
const router = express.Router()

const {
    getAllCrimes,
    getAllMyReportedCrimes,
    getCrime,
    createCrime,
    deleteCrime,
    updateCrime
} = require('../controllers/crimes')

router.route('/').post(createCrime).get(getAllCrimes)
router.route('/mycrimes').get(getAllMyReportedCrimes)
router.route('/:id').get(getCrime).delete(deleteCrime).patch(updateCrime)


module.exports = router