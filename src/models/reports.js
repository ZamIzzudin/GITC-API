const mongoose = require('mongoose')

const report_scheme = new mongoose.Schema({
    tahun: String,
    bulan: String,
    total_revanue: Number,
    total_unit: Number,
    detail: {
        unit: {},
        revanue: {}
    }
})

const Report = mongoose.model("Report", report_scheme)

module.exports = Report