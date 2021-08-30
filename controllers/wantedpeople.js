const getAllWantedPeople = async (req, res) => {
    res.send('Get all Wanted People')
}

const getWantedPerson = async (req, res) => {
    res.send('Get Wanted Person')
}

const createWantedPerson = async (req, res) => {
    res.send('Create Wanted Person')
}

const updateWantedPerson = async (req, res) => {
    res.send('Update Wanted Person')
}

const deleteWantedPerson = async (req, res) => {
    res.send('Delete Wanted Person')
}


module.exports = {
    getAllWantedPeople,
    getWantedPerson,
    createWantedPerson,
    updateWantedPerson,
    deleteWantedPerson
}