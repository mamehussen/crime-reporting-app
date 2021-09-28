const express = require('express');
const router = express.Router()

var multer = require('multer')
var upload = multer({})

const {
    createMissingPerson,
    updateMissingPerson,
    deleteMissingPerson
} = require('../controllers/missingpeople')

router.route('/').post(upload.single('photo'), createMissingPerson)
router.route('/:id').delete(deleteMissingPerson).patch(updateMissingPerson)


module.exports = router