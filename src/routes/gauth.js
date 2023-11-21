const gauth = require('express').Router()
const { auth, redirect, driveList, upload, webView, download, remove } = require('../controllers/gauth')

// const config = require('../config/config.js')
// const connector = require('../config/gdrive.js')
// const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config

// const { refreshToken } = connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

// const cron = require('node-cron')

// AUTH
gauth.get('/auth', auth)
gauth.get('/redirect', redirect)

// READ
gauth.get('/drive/:id_folder', driveList)
gauth.get('/open/:id_file', webView)
gauth.get('/download/:id_file', download)

// CREATE
gauth.post('/upload/:id_folder', upload)

// DELETE
gauth.delete('/delete/:id_file', remove)

// cron.schedule('*/10 * * * *', () => {
//     refreshToken();
// });


module.exports = gauth