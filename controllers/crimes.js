const Crime = require('../models/Crime')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')
const { crossOriginEmbedderPolicy } = require('helmet')

const getAllCrimes = async(req, res) => {
    if(req.user.role !== 'police'){
        throw new UnauthenticatedError('You are not Authorized to access this route.')
    }
    const crimes = await Crime.find({}).sort({ createdAt: 'desc'}).exec();
    res.status(StatusCodes.OK).json({crimes})
}

const getAllMyReportedCrimes = async(req, res) => {
    const myCrimes = await Crime.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({myCrimes, count:myCrimes.length })
}

const getCrime = async(req, res) => {
    const {params: {id:crimeId}} = req
    const crime = await Crime.findOne({ _id:crimeId })
    if(!crime){
        throw new NotFoundError('Could\'nt find crime  crime')
    }
    res.status(StatusCodes.OK).json({ crime })
}

const createCrime = async(req, res) => {
    req.body.createdBy = req.user.userId
    const crime = await Crime.create(req.body)
    res.status(StatusCodes.CREATED).json({ crime })
}

const updateCrime = async(req, res) => {
    const {
        body:{crimeType, description},
        user: {userId},
        params: {id:crimeId}
    } = req

    if(crimeType === '' || description === ''){
        throw new BadRequestError('Empty Fields Error')
    }

    const crime = await Crime.findByIdAndUpdate(
        {_id:crimeId, createdBy:userId},
        req.body,
        {new:true, runValidators:true})
        if(!crime){
            throw new NotFoundError('Could\'nt find crime  crime')
        }
        res.status(StatusCodes.OK).json({ crime })

}

const deleteCrime = async(req, res) => {
    const {
        body:{crimeType, description},
        user: {userId},
        params: {id:crimeId}
    } = req

    const crime = await Crime.findByIdAndRemove({_id:crimeId, createdBy:userId})
        if(!crime){
            throw new NotFoundError('Could\'nt find crime  crime')
        }
        res.status(StatusCodes.OK).send()

}


module.exports = {
    getAllCrimes,
    getAllMyReportedCrimes,
    getCrime,
    createCrime,
    deleteCrime,
    updateCrime
}