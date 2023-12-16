const report = require('express').Router()
const { get_report_per_month, get_report_per_year } = require('../controllers/reports')

const { islogin } = require('../middleware/privilege')

// READ
report.get('/pm/:year/:month', islogin, get_report_per_month)
report.get('/py/:year', islogin, get_report_per_year)

module.exports = report