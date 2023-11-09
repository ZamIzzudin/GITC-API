const confirm = require('express').Router()
const { confirm_list, create, approve, revision, resubmit, reject, remove } = require('../controllers/confirm')

// READ
confirm.get('/:status', confirm_list)

// CREATE
confirm.post('/', create)

// UPDATE
confirm.put('/approve/:id_letter', approve)
confirm.put('/revision/:id_letter', revision)
confirm.put('/resubmit/:id_letter', resubmit)
confirm.put('/reject/:id_letter', reject)

// DELETE
confirm.delete('/:id_letter', remove)

module.exports = confirm