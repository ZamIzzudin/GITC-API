const Credential = require('../models/credentials.js')

async function get() {
    try {
        const credential = await Credential.findOne({ _id: '654a619e309d5d0a82db7d0b' }).maxTimeMS(20000)
        return credential
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const update = async (data) => {
    try {
        await Credential.updateOne({ _id: '654a619e309d5d0a82db7d0b' }, data).maxTimeMS(20000)
        return
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { get, update }