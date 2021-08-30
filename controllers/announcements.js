const getAllAnnouncements = async (req, res) => {
    res.send('Get all announcements')
}

const getAnnouncement = async (req, res) => {
    res.send('Get announcement')
}

const createAnnouncement = async (req, res) => {
    res.send('Create announcement')
}

const updateAnnouncement = async (req, res) => {
    res.send('Update announcement')
}

const deleteAnnouncement = async (req, res) => {
    res.send('Delete announcement')
}


module.exports = {
    getAllAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
}