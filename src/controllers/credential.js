const Credential = require('../models/credentials.js')

const get = async () => {
    const credential = await Credential.findOne({ _id: '654a12762e473cf733e2af1b' })
    return credential
}

const update = async (data) => {
    await Credential.updateOne({ _id: '654a12762e473cf733e2af1b' }, data)
}

module.exports = { get, update }