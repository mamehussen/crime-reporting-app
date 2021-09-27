const express = require('express');
const router = express.Router()

const {
    getAllAnonymousCrimes,
    getAnonymousCrime,
    createAnonymousCrime,
    deleteAnonymousCrime,
    updateAnonymousCrime
} = require('../controllers/anonymousCrime')

router.route('/').post(createAnonymousCrime).get(getAllAnonymousCrimes)
router.route('/:id').get(getAnonymousCrime).delete(deleteAnonymousCrime).patch(updateAnonymousCrime)


module.exports = router

