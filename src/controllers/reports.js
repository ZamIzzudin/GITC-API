const Report = require('../models/reports')

const get_report_per_month = async (req, res) => {
    const { year, month } = req.params

    try {
        const reports = await Report.findOne({ tahun: year, bulan: { '$regex': month, '$options': 'i' } })

        // Sort
        const top_percentage_rank = reports.detail.sort((curr, prev) => prev.percentage - curr.percentage).slice(0, 5).map((item => { return { category: item.category, sub_category: item.sub_category, percentage: item.percentage, unit: item.unit, revanue: item.revanue } }))
        const top_revanue_rank = reports.detail.sort((curr, prev) => prev.revanue - curr.revanue).slice(0, 5).map((item => { return { category: item.category, sub_category: item.sub_category, percentage: item.percentage, unit: item.unit, revanue: item.revanue } }))
        const top_unit_rank = reports.detail.sort((curr, prev) => prev.unit - curr.unit).slice(0, 5).map((item => { return { category: item.category, sub_category: item.sub_category, percentage: item.percentage, unit: item.unit, revanue: item.revanue } }))

        res.json({
            bulan: reports.bulan,
            tahun: reports.tahun,
            total_revanue: reports.total_revanue,
            total_unit: reports.total_unit,
            top_percentage_rank,
            top_revanue_rank,
            top_unit_rank,
            details: reports.detail
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}

const get_report_per_year = async (req, res) => {
    const { year } = req.params

    try {
        const reports = await Report.find({ tahun: year })
        let total_revanue = 0
        let total_unit = 0

        // Setup
        reports.map(report => {
            total_revanue += report.total_revanue
            total_unit += report.total_unit
        })

        // Sort
        const top_revanue_rank = reports.sort((curr, prev) => prev.total_revanue - curr.total_revanue).slice(0, 5).map((item => { return { bulan: item.bulan, total_revanue: item.total_revanue, total_unit: item.total_unit } }))
        const top_unit_rank = reports.sort((curr, prev) => prev.total_unit - curr.total_unit).slice(0, 5).map((item => { return { bulan: item.bulan, total_revanue: item.total_revanue, total_unit: item.total_unit } }))

        res.json({
            tahun: year,
            total_revanue,
            total_unit,
            top_revanue_rank,
            top_unit_rank,
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}


module.exports = { get_report_per_month, get_report_per_year }