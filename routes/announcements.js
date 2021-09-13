const express = require('express');
const router = express.Router()

const {
    getAllAnnouncements,
    getAnnouncement
} = require('../controllers/announcements')

router.route('/').get(getAllAnnouncements)
router.route('/:id').get(getAnnouncement)


module.exports = router