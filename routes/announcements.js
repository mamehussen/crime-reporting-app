const express = require('express');
const router = express.Router()

const {
    getAllAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} = require('../controllers/announcements')

router.route('/').post(createAnnouncement).get(getAllAnnouncements)
router.route('/:id').get(getAnnouncement).delete(deleteAnnouncement).patch(updateAnnouncement)


module.exports = router