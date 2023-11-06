// Setup express Router
const express = require('express');
const routes = express.Router();
const config = require('../config/config.js')
const connector = require('../config/gdrive.js')
const fs = require('fs')

const { REDIRECT_URI, CLIENT_SECRET, CLIENT_ID } = config

const { oauth2Client: oauth, drive } = connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

routes.get('/', (req, res) => {
    res.json({
        message: 'Welcome to VZE Dashboard Rest API',
        createdBy: "ayamiyudin"
    })
})

routes.get('/auth/google', (req, res) => {
    const url = oauth.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/drive'
        ]
    })
    res.redirect(url)
})

routes.get('/google/redirect', async (req, res) => {
    const { code } = req.query
    const { tokens } = await oauth.getToken(code)
    oauth.setCredentials(tokens)
    fs.writeFileSync('credential.json', JSON.stringify(tokens))
    res.redirect('/')
})

routes.get('/drive', async (req, res) => {
    const response = await drive.files.list()
    res.send(response.data.files)
})

module.exports = routes