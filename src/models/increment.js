const mongoose = require('mongoose')

const increment_scheme = new mongoose.Schema({
    cl_latest_number: Number,
    ol_latest_number: Number
})

const Increment = mongoose.model("Increment", increment_scheme)

module.exports = Increment