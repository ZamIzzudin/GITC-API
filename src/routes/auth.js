const express = require('express');
const auth = express.Router();
const { login, refresh, register, adjust, takedown } = require('../controllers/auth')
const { sysadmin, islogin } = require('../middleware/privilege')

// GET
auth.get('/refresh', islogin, refresh)

// POST
auth.post('/login', login)
auth.post('/register', register)

// PUT
auth.put('/adjust/:id', sysadmin, adjust)

// DELETE
auth.delete('/takedown/:id', sysadmin, takedown)

module.exports = auth
