const Tip = require('../models/Tip')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')

const getAllTips = async (req, res) => {
    const tips = await Tip.find({})
    res.status(StatusCodes.OK).json({ tips })
}

const getTip = async (req, res) => {
    const {params: {id:tipId}} = req
    const tip = await Tip.findOne({ _id:tipId })
    if(!tip){
        throw new NotFoundError('Could\'nt find tip')
    }
    res.status(StatusCodes.OK).json({ tip })
}


const createTip = async (req, res) => {
    req.body.createdBy = req.user.userId
    const tip = await Tip.create(req.body)
    res.status(StatusCodes.CREATED).json({ tip })
}

const updateTip = async (req, res) => {
    const {
        body:{ description },
        user: {userId},
        params: {id:tipId}
    } = req

    if(description === ''){
        throw new BadRequestError('Empty Fields Error')
    }

    const tip = await Tip.findByIdAndUpdate(
        {_id:tipId, createdBy:userId},
        req.body,
        {new:true, runValidators:true})
        if(!tip){
            throw new NotFoundError('Could\'nt find tip')
        }
        res.status(StatusCodes.OK).json({ tip })
}

const deleteTip = async (req, res) => {
    const {
        body:{description},
        user: {userId},
        params: {id:tipId}
    } = req

    const tip = await Tip.findByIdAndRemove({_id:tipId, createdBy:userId})
    if(!tip){
        throw new NotFoundError('Could\'nt find tip')
    }
        res.status(StatusCodes.OK).send('Deleted Successfully')
}


module.exports = {
    getAllTips,
    getTip,
    createTip,
    updateTip,
    deleteTip
}