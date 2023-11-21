const gauth = require('express').Router()
const { auth, redirect, driveList, upload, webView, download, remove } = require('../controllers/gauth')

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



module.exports = gauth