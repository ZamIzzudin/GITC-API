const mongoose = require('mongoose')

const increment_scheme = new mongoose.Schema({
    latest_number: Number,
    latest_template: String,
    previous_date_created: Date,
    previous_number: Number,
    previous_template: String
})

const Increment = mongoose.model("Increment", increment_scheme)

module.exports = Increment