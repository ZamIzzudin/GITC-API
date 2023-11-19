const mongoose = require('mongoose')

const offer_scheme = new mongoose.Schema({
    nama_penerbit: String,
    tanggal_surat: Date,
    nomor_surat: {
        type: String,
        default: 'unset'
    },
    perihal: String,
    nama_tertuju: String,
    media_referensi: {
        type: String,
        enum: ["Email", "Telepon", "Perjanjian Kerja Sama", "Kesepakatan Pada Tanggal"],
        default: ["Email"]
    },
    tanggal_referensi: Date,
    jenis_permohonan: String,
    produk: [],
    tanggal_kegiatan: Date,
    total_harga: Number,
    nominal_terbilang: String,
    term_n_condition: String,
    approver: {
        type: String,
        default: "unset"
    },
    submitted_by: String,
    revisi: {
        type: Array,
        default: []
    },
    template: [],
    status: {
        type: String,
        enum: ['submitted', 'approved', 'need revision', 'rejected', 'done'],
        default: 'submitted'
    },
    drive_id: {
        type: String,
        default: 'unset'
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const Offer = mongoose.model("Offer", offer_scheme)

module.exports = Offer