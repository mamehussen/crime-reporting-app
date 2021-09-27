const MissingPerson = require('../models/MissingPerson')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')

const getAllMissingPeople = async (req, res) => {
    const missingPeople = await MissingPerson.find({}).sort({ createdAt: 'desc'}).exec();
    res.status(StatusCodes.OK).json({ missingPeople })
}

const getMissingPerson = async (req, res) => {
    const {params: {id:missingPersonId}} = req
    const missingPerson = await MissingPerson.findOne({ _id:missingPersonId })
    if(!missingPerson){
        throw new NotFoundError('Could\'nt find missing person')
    }
    res.status(StatusCodes.OK).json({ missingPerson })
}

const createMissingPerson = async (req, res) => {
    req.body.createdBy = req.user.userId
    const missingPerson = await MissingPerson.create(req.body)
    res.status(StatusCodes.CREATED).json({ missingPerson })
}

const updateMissingPerson = async (req, res) => {
    const {
        body:{ description },
        user: {userId},
        params: {id:missingPersonId}
    } = req

    const missingPerson = await MissingPerson.findByIdAndUpdate(
        {_id:missingPersonId, createdBy:userId},
        req.body,
        {new:true, runValidators:true})
        if(!missingPerson){
            throw new NotFoundError('Could\'nt find missingPerson')
        }
        res.status(StatusCodes.OK).json({ missingPerson })
}

const deleteMissingPerson = async (req, res) => {
    const {
        body:{description},
        user: {userId},
        params: {id:missingPersonId}
    } = req

    const missingPerson = await MissingPerson.findByIdAndRemove({_id:missingPersonId, createdBy:userId})
    if(!missingPerson){
        throw new NotFoundError('Could\'nt find missingPerson')
    }
        res.status(StatusCodes.OK).send('Deleted Successfully')
}


module.exports = {
    getAllMissingPeople,
    getMissingPerson,
    createMissingPerson,
    updateMissingPerson,
    deleteMissingPerson
}