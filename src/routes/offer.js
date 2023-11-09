const offer = require('express').Router()
const { offer_list, create, approve, resubmit, revision, reject, remove } = require('../controllers/offer')

// READ
offer.get('/:status', offer_list)

// CREATE
offer.post('/', create)

// UPDATE
offer.put('/approve/:id_letter', approve)
offer.put('/revision/:id_letter', revision)
offer.put('/resubmit/:id_letter', resubmit)
offer.put('/reject/:id_letter', reject)

// DELETE
offer.delete('/:id_letter', remove)

module.exports = offer