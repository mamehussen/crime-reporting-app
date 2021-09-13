const express = require('express');
const router = express.Router()

const {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement   
} = require('../controllers/announcements')

router.route('/').post(createAnnouncement)
router.route('/:id').delete(deleteAnnouncement).patch(updateAnnouncement)


module.exports = router