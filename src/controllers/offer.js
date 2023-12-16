const Offer = require('../models/offers')
const { getLatestNumber, updateLatestNumber } = require('./increment.js')

const offer_list = async (req, res) => {
    try {
        const offers = await Offer.find(query)
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

const offer_detail = async (req, res) => {
    const { id_letter } = req.params

    try {
        const offer = await Offer.findOne({ _id: id_letter })

        if (offer) {
            res.status(200).json({
                status: 200,
                data: offer
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'Offering Letter Not Found',
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
            nama_penerbit: body.nama_penerbit,
            tanggal_surat: body.tanggal_surat,
            perihal: body.perihal,
            nama_tertuju: body.nama_tertuju,
            media_referensi: body.media_ref,
            tanggal_referensi: body.tanggal_ref,
            jenis_permohonan: body.jenis_permohonan,
            produk: body.penawaran_forms,
            jumlah_produk: body.penawaran_forms.length,
            total_harga: body.total_biaya,
            nominal_terbilang: body.nominal_terbilang,
            term_n_condition: body.TNC,
            jabatan_tertuju: body.jabatan,
            nama_perusahaan: body.nama_perusahaan,
            alamat_perusahaan: body.alamat_perusahaan,
            category: body.category,
            sub_category: body.sub_category,
            jumlah_tnc: body.TNC.length,
            catatan: body.catatan,
            submitted_by: body.submitted_by,
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

        if (approved.modifiedCount) {
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

        if (revision.modifiedCount) {
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
            nama_penerbit: body.nama_penerbit,
            tanggal_surat: body.tanggal_surat,
            perihal: body.perihal,
            nama_tertuju: body.nama_tertuju,
            media_referensi: body.media_ref,
            tanggal_referensi: body.tanggal_ref,
            jenis_permohonan: body.jenis_permohonan,
            produk: body.penawaran_forms,
            jumlah_produk: body.penawaran_forms.length,
            total_harga: body.total_biaya,
            nominal_terbilang: body.nominal_terbilang,
            term_n_condition: body.TNC,
            jabatan_tertuju: body.jabatan,
            nama_perusahaan: body.nama_perusahaan,
            alamat_perusahaan: body.alamat_perusahaan,
            category: body.category,
            sub_category: body.sub_category,
            jumlah_tnc: body.TNC.length,
            catatan: body.catatan,
            submitted_by: body.submitted_by,
            status: 'submitted'
        }

        const resubmitted = await Offer.updateOne({ _id: id_letter }, payload)

        if (resubmitted.modifiedCount) {
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

        if (rejected.modifiedCount) {
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

const print = async (req, res) => {
    const { id_letter } = req.params

    try {
        const latestNumber = await getLatestNumber()

        const payload = {
            nomor_surat: latestNumber.latest_template,
        }

        await updateLatestNumber(latestNumber.latest_number + 1)

        const printed = await Offer.updateOne({ _id: id_letter }, payload)

        if (printed.modifiedCount) {
            res.status(200).json({
                status: 200,
                message: 'Success Print Offering Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Print Offering letter'
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


module.exports = { offer_list, offer_detail, create, approve, revision, resubmit, reject, remove, print }