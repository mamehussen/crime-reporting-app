const MissingPerson = require('../models/WantedPerson')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')
const WantedPerson = require('../models/WantedPerson')


const getAllWantedPeople = async (req, res) => {
    const wantedPeople = await WantedPerson.find({}).sort({ createdAt: 'desc'}).exec();
    res.status(StatusCodes.OK).json({ wantedPeople })
}

const getWantedPerson = async (req, res) => {
    const {params: {id:wantedPersonId}} = req
    const wantedPerson = await WantedPerson.findOne({ _id:wantedPersonId })
    if(!wantedPerson){
        throw new NotFoundError('Could\'nt find wanted person')
    }
    res.status(StatusCodes.OK).json({ wantedPerson })
}

const createWantedPerson = async (req, res) => {
    req.body.createdBy = req.user.userId
    const wantedPerson = await WantedPerson.create(req.body)
    res.status(StatusCodes.CREATED).json({ wantedPerson })
}

const updateWantedPerson = async (req, res) => {
    const {
        body:{ description },
        user: {userId},
        params: {id:wantedPersonId}
    } = req

    const wantedPerson = await WantedPerson.findByIdAndUpdate(
        {_id:wantedPersonId, createdBy:userId},
        req.body,
        {new:true, runValidators:true})
        if(!wantedPerson){
            throw new NotFoundError('Could\'nt find wantedPerson')
        }
        res.status(StatusCodes.OK).json({ wantedPerson })
}


const deleteWantedPerson = async (req, res) => {
    const {
        body:{description},
        user: {userId},
        params: {id:wantedPersonId}
    } = req

    const wantedPerson = await WantedPerson.findByIdAndRemove({_id:wantedPersonId, createdBy:userId})
    if(!wantedPerson){
        throw new NotFoundError('Could\'nt find wantedPerson')
    }
        res.status(StatusCodes.OK).send('Deleted Successfully')
}


module.exports = {
    getAllWantedPeople,
    getWantedPerson,
    createWantedPerson,
    updateWantedPerson,
    deleteWantedPerson
}