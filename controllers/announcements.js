const Announcement = require('../models/Announcement')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')

const getAllAnnouncements = async (req, res) => {
    const announcements = await Announcement.find({})
    res.status(StatusCodes.OK).json({ announcements })
}

const getAnnouncement = async (req, res) => {
    const {params: {id:announcementId}} = req
    const announcement = await Crime.findOne({ _id:announcementId })
    if(!announcement){
        throw new NotFoundError('Could\'nt find announcement')
    }
    res.status(StatusCodes.OK).json({ announcement })
}

const createAnnouncement = async (req, res) => {
    if(req.user.role !== 'police'){
        throw new UnauthenticatedError('You are not Authorized to access this route.')
    }
    req.body.createdBy = req.user.userId
    const announcement = await Announcement.create(req.body)
    res.status(StatusCodes.CREATED).json({ announcement })
}

const updateAnnouncement = async (req, res) => {
    const {
        body:{title, content},
        user: {userId},
        params: {id:announcementId}
    } = req

    if(title === '' || content === ''){
        throw new BadRequestError('Empty Fields Error')
    }

    const announcement = await Announcement.findByIdAndUpdate(
        {_id:announcementId, createdBy:userId},
        req.body,
        {new:true, runValidators:true})
        if(!announcement){
            throw new NotFoundError('Could\'nt find announcement')
        }
        res.status(StatusCodes.OK).json({ announcement })

}

const deleteAnnouncement = async (req, res) => {
    const {
        body:{title, content},
        user: {userId},
        params: {id:announcementId}
    } = req

    const announcement = await Announcement.findByIdAndRemove({_id:announcementId, createdBy:userId})
    if(!announcement){
        throw new NotFoundError('Could\'nt find announcement')
    }
        res.status(StatusCodes.OK).send('Deleted Successfully')
}


module.exports = {
    getAllAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
}
