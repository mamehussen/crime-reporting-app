const MissingPerson = require('../models/MissingPerson')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError, UnauthenticatedError} = require('../errors')

const multer = require('multer')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dfifwdmr9',
    api_key: '158848835582553',
    api_secret: 'mh98mgs9xddxvzZl_Z6OTMzStFk'
  });
  
  const cloudinaryUpload = (fileBuffer) => new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream((err, res) => {
      if (err) reject(err);
      else resolve(res);
    }).end(fileBuffer);
  })
  

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
    
    const file = req.file;

    if(file){
        const uploaded = await cloudinaryUpload(file.buffer);
        const uploadedUrl = uploaded.secure_url;
        req.body.image = uploadedUrl;
    }

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