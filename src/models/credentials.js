const mongoose = require('mongoose')

const credential_scheme = new mongoose.Schema({
    access_token: String,
    scope: String,
    id_token: String,
    refresh_token: String,
    expiry_date: Number,
})

const Credential = mongoose.model("Credential", credential_scheme)

module.exports = Credential