const AnonymousCrime = require('../models/AnonymousCrime')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')
const { crossOriginEmbedderPolicy } = require('helmet')

const getAllAnonymousCrimes = async(req, res) => {
    
    const anonymousCrimes = await AnonymousCrime.find({})
    res.status(StatusCodes.OK).json({anonymousCrimes})
}

const getAnonymousCrime = async(req, res) => {
    const {params: {id:crimeId}} = req
    const crime = await AnonymousCrime.findOne({ _id:crimeId })
    if(!crime){
        throw new NotFoundError('Could\'nt find crime  crime')
    }
    res.status(StatusCodes.OK).json({ crime })
}

const createAnonymousCrime = async(req, res) => {
    const crime = await AnonymousCrime.create(req.body)
    res.status(StatusCodes.CREATED).json({ crime })
}

const updateAnonymousCrime = async(req, res) => {
    const {
        body:{crimeType, description},
        params: {id:crimeId}
    } = req

    if(crimeType === '' || description === ''){
        throw new BadRequestError('Empty Fields Error')
    }

    const crime = await AnonymousCrime.findByIdAndUpdate(
        {_id:crimeId},
        req.body,
        {new:true, runValidators:true})
        if(!crime){
            throw new NotFoundError('Could\'nt find crime  crime')
        }
        res.status(StatusCodes.OK).json({ crime })

}

const deleteAnonymousCrime = async(req, res) => {
    const {
        body:{crimeType, description},
        params: {id:crimeId}
    } = req

    const crime = await AnonymousCrime.findByIdAndRemove({_id:crimeId})
        if(!crime){
            throw new NotFoundError('Could\'nt find crime  crime')
        }
        res.status(StatusCodes.OK).send()

}


module.exports = {
    getAllAnonymousCrimes,
    getAnonymousCrime,
    createAnonymousCrime,
    deleteAnonymousCrime,
    updateAnonymousCrime
}