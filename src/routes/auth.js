const auth = require('express').Router()
const { login, refresh, register, adjust, takedown, guest_list, user_list } = require('../controllers/auth')
const { sysadmin, islogin } = require('../middleware/privilege')

// GET
auth.get('/refresh', islogin, refresh)
auth.get('/guest', sysadmin, guest_list)
auth.get('/list', sysadmin, user_list)

// POST
auth.post('/login', login)
auth.post('/register', sysadmin, register)

// PUT
auth.put('/adjust/:id', sysadmin, adjust)

// DELETE
auth.delete('/takedown/:id', sysadmin, takedown)

module.exports = auth
