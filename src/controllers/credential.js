const Credential = require('../models/credentials.js')

async function get() {
    try {
        const credential = await Credential.findOne({ _id: '654a12762e473cf733e2af1b' })
        return credential
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const update = async (data) => {
    try {
        await Credential.updateOne({ _id: '654a12762e473cf733e2af1b' }, data)
        return
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { get, update }