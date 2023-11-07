const mongoose = require('mongoose')

const offer_scheme = new mongoose.Schema({
    nama_penerbit: String,
    tanggal_surat: Date,
    nomor_surat: {
        type: String,
        defualt: 'unset'
    },
    perihal: String,
    nama_tertuju: String,
    media_referensi: String,
    tanggal_referensi: Date,
    jenis_permohonan: String,
    kategori_produk: {
        type: String,
        enum: ['X', 'Y', 'Z'],
        default: 'X'
    },
    jenis_produk: {
        type: String,
        enum: ['X', 'Y', 'Z'],
        default: 'X'
    },
    tanggal_kegiatan: Date,
    harga: Number,
    jumlah: Number,
    total_harga: Number,
    nominal_terbilang: String,
    term_n_condition: String,
    approval: String,
    approved_by: String,
    submitted_by: String,
    revisi: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'approved', 'need revision', 'rejected'],
        default: 'draft'
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