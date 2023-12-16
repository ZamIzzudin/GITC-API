const offer = require('express').Router()
const { offer_list, offer_detail, create, approve, resubmit, revision, reject, remove, print } = require('../controllers/offer')
const { islogin, admins, pic } = require('../middleware/privilege')

// READ
offer.get('/:page', islogin, offer_list)
offer.get('/detail/:id_letter', islogin, offer_detail)

// CREATE
offer.post('/', admins, create)

// UPDATE
offer.put('/approve/:id_letter', pic, approve)
offer.put('/revision/:id_letter', pic, revision)
offer.put('/resubmit/:id_letter', admins, resubmit)
offer.put('/reject/:id_letter', pic, reject)
offer.put('/print/:id_letter', admins, print)

// DELETE
offer.delete('/:id_letter', admins, remove)

module.exports = offer