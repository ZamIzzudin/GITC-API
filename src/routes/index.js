// Setup express Router
const routes = require('express').Router()
const gauth = require('./gauth')
const refresh = require('../api/cron')
const auth = require('./auth')
const offer = require('./offer')
const confirm = require('./confirm')
const report = require('./reports')

const { upload } = require('../controllers/uploader')
const { admins } = require('../middleware/privilege')


// Default
routes.get('/', (req, res) => {
    res.json({
        message: 'Welcome to VZE Dashboard Rest API',
        createdBy: "ayamiyudin"
    })
})

routes.use('/google', gauth)
routes.use('/auth', auth)
routes.use('/offer', offer)
routes.use('/confirm', confirm)
routes.use('/report', report)
routes.get('/api/cron', refresh)

routes.post('/utils/upload', admins, upload)

routes.get('*', (req, res) => {
    res.json({
        status: 404,
        message: 'Endpoint not found',
    })
})

module.exports = routes