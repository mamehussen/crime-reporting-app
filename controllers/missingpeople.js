const getAllMissingPeople = async (req, res) => {
    res.send('Get all Missing People')
}

const getMissingPerson = async (req, res) => {
    res.send('Get Missing Person')
}

const createMissingPerson = async (req, res) => {
    res.send('Create Missing Person')
}

const updateMissingPerson = async (req, res) => {
    res.send('Update Missing Person')
}

const deleteMissingPerson = async (req, res) => {
    res.send('Delete MissingPerson')
}


module.exports = {
    getAllMissingPeople,
    getMissingPerson,
    createMissingPerson,
    updateMissingPerson,
    deleteMissingPerson
}