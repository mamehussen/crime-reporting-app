const express = require('express');
const router = express.Router()

var multer = require('multer')
var upload = multer({})

const {
    getAllCrimes,
    getAllMyReportedCrimes,
    getCrime,
    createCrime,
    deleteCrime,
    updateCrime
} = require('../controllers/crimes')

router.route('/').post(upload.single('photo'), createCrime).get(getAllCrimes)
router.route('/mycrimes').get(getAllMyReportedCrimes)
router.route('/:id').get(getCrime).delete(deleteCrime).patch(updateCrime)


module.exports = router