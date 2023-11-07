// Setup express Router
const express = require('express');
const routes = express.Router();
const gauth = require('./gauth');
const auth = require('./auth');

// Default
routes.get('/', (req, res) => {
    res.json({
        message: 'Welcome to VZE Dashboard Rest API',
        createdBy: "ayamiyudin"
    })
})

routes.use('/google', gauth)
routes.use('/auth', auth)

routes.get('*', (req, res) => {
    res.json({
        status: 404,
        message: 'Endpoint not found',
    })
})

module.exports = routes