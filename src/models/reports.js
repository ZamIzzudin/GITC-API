const mongoose = require('mongoose')

const report_scheme = new mongoose.Schema({
    tahun: String,
    bulan: String,
    total_revanue: Number,
    total_unit: Number,
    detail: {
        type: Array,
        default: {
            category: String,
            percentage: Number,
            unit: Number,
            revanue: Number
        }
    },
})

const Report = mongoose.model("Report", report_scheme)

module.exports = Report