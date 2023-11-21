// Setup express Router
const routes = require('express').Router()
// const gauth = require('./gauth')
const { vercelRefresh, cronRefresh } = require('../crons/refreshGoogleToken')
const auth = require('./auth')
const offer = require('./offer')
const confirm = require('./confirm')
const cron = require('node-cron')

const { upload } = require('../controllers/uploader')

// Default
routes.get('/', (req, res) => {
    res.json({
        message: 'Welcome to VZE Dashboard Rest API',
        createdBy: "ayamiyudin"
    })
})

// routes.use('/google', gauth)
routes.use('/auth', auth)
routes.use('/offer', offer)
routes.use('/confirm', confirm)
routes.get('/refreshToken', vercelRefresh)

routes.post('/oth/upload/:id_letter', upload)

cron.schedule('* * * * *', () => {
    cronRefresh();
});

routes.get('*', (req, res) => {
    res.json({
        status: 404,
        message: 'Endpoint not found',
    })
})

module.exports = routes