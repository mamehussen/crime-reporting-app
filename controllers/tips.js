const getAllTips = async (req, res) => {
    res.send('Get all Tips')
}

const getTip = async (req, res) => {
    res.send('Get Tip')
}

const createTip = async (req, res) => {
    res.send('Create Tip')
}

const updateTip = async (req, res) => {
    res.send('Update Tip')
}

const deleteTip = async (req, res) => {
    res.send('Delete Tip')
}


module.exports = {
    getAllTips,
    getTip,
    createTip,
    updateTip,
    deleteTip
}