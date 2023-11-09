const Offer = require('../models/offers')


const offer_list = async (req, res) => {
    const { status } = req.params

    try {
        if (!status) {
            throw new Error('Status must be filled')
        }

        const offers = await Offer.find({ status })

        if (offers.length > 0 && offers !== null) {
            res.status(200).json({
                status: 200,
                data: offers
            })
        } else {
            res.status(200).json({
                status: 200,
                message: 'Offering Letter Not Found',
                data: []
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}

const create = async (req, res) => {
    const body = req.body

    try {
        const payload = {
            nama_penerbit: body.nama_penerbit ? body.nama_penerbit : new Error('All require paramater must be filled'),
            tanggal_surat: body.tanggal_surat ? body.tanggal_surat : new Error('All require paramater must be filled'),
            perihal: body.perihal ? body.perihal : new Error('All require paramater must be filled'),
            nama_tertuju: body.nama_tertuju ? body.nama_tertuju : new Error('All require paramater must be filled'),
            media_referensi: body.media_referensi ? body.media_referensi : new Error('All require paramater must be filled'),
            tanggal_referensi: body.tanggal_referensi ? body.tanggal_referensi : new Error('All require paramater must be filled'),
            jenis_permohonan: body.jenis_permohonan ? body.jenis_permohonan : new Error('All require paramater must be filled'),
            kategori_produk: body.kategori_produk ? body.kategori_produk : new Error('All require paramater must be filled'),
            jenis_produk: body.jenis_produk ? body.jenis_produk : new Error('All require paramater must be filled'),
            tanggal_kegiatan: body.tanggal_kegiatan ? body.tanggal_kegiatan : new Error('All require paramater must be filled'),
            harga: body.harga ? body.harga : new Error('All require paramater must be filled'),
            jumlah: body.jumlah ? body.jumlah : new Error('All require paramater must be filled'),
            total_harga: body.total_harga ? body.total_harga : new Error('All require paramater must be filled'),
            nominal_terbilang: body.nominal_terbilang ? body.nominal_terbilang : new Error('All require paramater must be filled'),
            term_n_condition: body.term_n_condition ? body.term_n_condition : new Error('All require paramater must be filled'),
            submitted_by: body.submitted_by ? body.submitted_by : new Error('All require paramater must be filled'),
        }

        const new_offer = await Offer.create(payload)

        if (new_offer) {
            return res.status(202).json({
                status: 202,
                message: 'success to create an offering letter'
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'failed to create an offering letter'
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: error.message
        })
    }
}

const approve = async (req, res) => {
    const { id_letter } = req.params
    const { approver } = req.body

    try {
        const payload = {
            status: 'approved',
            approver
        }

        const approved = await Offer.updateOne({ _id: id_letter }, payload)

        if (approved.acknowledged) {
            res.status(200).json({
                status: 200,
                message: 'Success Approved Offering Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot approve offering letter'
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}

const revision = async (req, res) => {
    const { id_letter } = req.params
    const { revision_list, approver } = req.body

    try {
        const payload = {
            status: 'need revision',
            revisi: revision_list,
            approver
        }

        const revision = await Offer.updateOne({ _id: id_letter }, payload)

        if (revision.acknowledged) {
            res.status(200).json({
                status: 200,
                message: 'Success Asking Revision Offering Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Asking Revision offering letter'
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}

const resubmit = async (req, res) => {
    const { id_letter } = req.params
    const body = req.body

    try {
        const payload = {
            nama_penerbit: body.nama_penerbit ? body.nama_penerbit : new Error('All require paramater must be filled'),
            tanggal_surat: body.tanggal_surat ? body.tanggal_surat : new Error('All require paramater must be filled'),
            perihal: body.perihal ? body.perihal : new Error('All require paramater must be filled'),
            nama_tertuju: body.nama_tertuju ? body.nama_tertuju : new Error('All require paramater must be filled'),
            media_referensi: body.media_referensi ? body.media_referensi : new Error('All require paramater must be filled'),
            tanggal_referensi: body.tanggal_referensi ? body.tanggal_referensi : new Error('All require paramater must be filled'),
            jenis_permohonan: body.jenis_permohonan ? body.jenis_permohonan : new Error('All require paramater must be filled'),
            kategori_produk: body.kategori_produk ? body.kategori_produk : new Error('All require paramater must be filled'),
            jenis_produk: body.jenis_produk ? body.jenis_produk : new Error('All require paramater must be filled'),
            tanggal_kegiatan: body.tanggal_kegiatan ? body.tanggal_kegiatan : new Error('All require paramater must be filled'),
            harga: body.harga ? body.harga : new Error('All require paramater must be filled'),
            jumlah: body.jumlah ? body.jumlah : new Error('All require paramater must be filled'),
            total_harga: body.total_harga ? body.total_harga : new Error('All require paramater must be filled'),
            nominal_terbilang: body.nominal_terbilang ? body.nominal_terbilang : new Error('All require paramater must be filled'),
            term_n_condition: body.term_n_condition ? body.term_n_condition : new Error('All require paramater must be filled'),
            submitted_by: body.submitted_by ? body.submitted_by : new Error('All require paramater must be filled'),
            status: 'submitted'
        }

        const resubmitted = await Offer.updateOne({ _id: id_letter }, payload)

        if (resubmitted.acknowledged) {
            res.status(200).json({
                status: 200,
                message: 'Success Resubmit Offering Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Resubmit offering letter'
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}

const reject = async (req, res) => {
    const { id_letter } = req.params
    const { approver } = req.body

    try {
        const payload = {
            approver,
            status: 'rejected'
        }

        const rejected = await Offer.updateOne({ _id: id_letter }, payload)

        if (rejected.acknowledged) {
            res.status(200).json({
                status: 200,
                message: 'Success Reject Offering Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Reject offering letter'
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}

const remove = async (req, res) => {
    const { id_letter } = req.params

    try {
        const deleted = await Offer.deleteOne({ _id: id_letter })

        if (deleted.deletedCount !== 0) {
            console.log(deleted)
            res.status(200).json({
                status: 200,
                message: 'Succes Delete Offering Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Delete offering letter'
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server failed'
        })
    }
}

module.exports = { offer_list, create, approve, revision, resubmit, reject, remove }