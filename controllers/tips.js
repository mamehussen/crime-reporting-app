const Tip = require('../models/Tip')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')

const getAllTips = async (req, res) => {
    res.send('Get all Tips')
}

const getTip = async (req, res) => {
    res.send('Get Tip')
}

const createTip = async (req, res) => {
    // req.body.createdBy = req.user.userId
    const tip = await Tip.create(req.body)
    res.status(StatusCodes.CREATED).json({ tip })
}

const updateTip = async (req, res) => {
    res.send('Update Tip')
}

const deleteTip = async (req, res) => {
    res.send('Delete Tip')
}


module.exports = {
    getAllTips,
    getTip,
    createTip,
    updateTip,
    deleteTip
}