const express = require('express');
const router = express.Router()

const {
    getAllTips,
    getTip,
    createTip,
    updateTip,
    deleteTip
} = require('../controllers/tips')

router.route('/').post(createTip).get(getAllTips)
router.route('/:id').get(getTip).delete(deleteTip).patch(updateTip)


module.exports = router