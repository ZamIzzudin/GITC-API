const express = require('express');
const gauth = express.Router();

const connector = require('../config/gdrive.js')
const fs = require('fs')
const config = require('../config/config.js')
const cron = require('node-cron')

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config
const { oauth2Client: oauth, drive, refreshToken } = connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

gauth.get('/auth', (req, res) => {
    const url = oauth.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/drive'
        ]
    })
    res.redirect(url)
})

gauth.get('/redirect', async (req, res) => {
    const { code } = req.query
    const { tokens } = await oauth.getToken(code)
    oauth.setCredentials(tokens)
    fs.writeFileSync('credential.json', JSON.stringify(tokens))
    res.redirect('/')
})

gauth.get('/drive', async (req, res) => {
    const response = await drive.files.list()
    res.send(response.data.files)
})

cron.schedule('*/15 * * * *', () => {
    refreshToken();
});

module.exports = gauth