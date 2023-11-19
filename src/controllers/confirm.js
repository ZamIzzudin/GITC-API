const Confirm = require('../models/confirms')
const { getLatestNumber, updateLatestNumber } = require('./increment.js')

const confirm_list = async (req, res) => {
    const { status } = req.params

    try {
        if (!status) {
            throw new Error('Status must be filled')
        }

        const confirms = await Confirm.find({ status })

        if (confirms.length > 0 && confirms !== null) {
            res.status(200).json({
                status: 200,
                data: confirms
            })
        } else {
            res.status(200).json({
                status: 200,
                message: 'Confirming Letter Not Found',
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
            nama_penerbit: body.nama_penerbit,
            tanggal_surat: body.tanggal_surat,
            perihal: body.perihal,
            nama_tertuju: body.nama_tertuju,
            media_referensi: body.media_referensi,
            tanggal_referensi: body.tanggal_referensi,
            jenis_permohonan: body.jenis_permohonan,
            produk: body.produk,
            tanggal_kegiatan: body.tanggal_kegiatan,
            durasi_kegiatan: body.durasi_kegiatan,
            total_harga: body.total_harga,
            nominal_terbilang: body.nominal_terbilang,
            term_n_condition: body.term_n_condition,
            submitted_by: body.submitted_by,
        }

        const new_confirm = await Confirm.create(payload)

        if (new_confirm) {
            return res.status(202).json({
                status: 202,
                message: 'success to create an Confirming letter'
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'failed to create an Confirming letter'
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

        const approved = await Confirm.updateOne({ _id: id_letter }, payload)

        if (approved.modifiedCount) {
            res.status(200).json({
                status: 200,
                message: 'Success Approved Confirming Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot approve Confirming letter'
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

        const revision = await Confirm.updateOne({ _id: id_letter }, payload)

        if (revision.modifiedCount) {
            res.status(200).json({
                status: 200,
                message: 'Success Asking Revision Confirming Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Asking Revision Confirming letter'
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
            media_referensi: body.media_referensi,
            tanggal_referensi: body.tanggal_referensi,
            jenis_permohonan: body.jenis_permohonan,
            produk: body.produk,
            tanggal_kegiatan: body.tanggal_kegiatan,
            durasi_kegiatan: body.durasi_kegiatan,
            total_harga: body.total_harga,
            nominal_terbilang: body.nominal_terbilang,
            term_n_condition: body.term_n_condition,
            submitted_by: body.submitted_by,
            status: 'submitted'
        }

        const resubmitted = await Confirm.updateOne({ _id: id_letter }, payload)

        if (resubmitted.modifiedCount) {
            res.status(200).json({
                status: 200,
                message: 'Success Resubmit Confirming Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Resubmit Confirming letter'
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

        const rejected = await Confirm.updateOne({ _id: id_letter }, payload)

        if (rejected.modifiedCount) {
            res.status(200).json({
                status: 200,
                message: 'Success Reject Confirming Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Reject Confirming letter'
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
        const deleted = await Confirm.deleteOne({ _id: id_letter })

        if (deleted.deletedCount !== 0) {
            console.log(deleted)
            res.status(200).json({
                status: 200,
                message: 'Succes Delete Confirming Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Delete Confirming letter'
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

        const printed = await Confirm.updateOne({ _id: id_letter }, payload)

        if (printed.modifiedCount) {
            res.status(200).json({
                status: 200,
                message: 'Success Print Confirming Letter'
            })
        } else {
            res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'Cannot Print Confirming letter'
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

module.exports = { confirm_list, create, approve, revision, resubmit, reject, remove, print }