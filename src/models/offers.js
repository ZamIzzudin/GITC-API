const mongoose = require('mongoose')

const offer_scheme = new mongoose.Schema({
    nama_penerbit: String,
    tanggal_surat: String,
    nomor_surat: {
        type: String,
        default: 'unset'
    },
    perihal: String,
    nama_perusahaan: String,
    alamat_perusahaan: String,
    nama_tertuju: String,
    jabatan_tertuju: String,
    media_referensi: {
        type: String,
        enum: ["Email", "Telepon", "Perjanjian Kerja Sama", "Kesepakatan Pada Tanggal"],
        default: ["Email"]
    },
    tanggal_referensi: String,
    jenis_permohonan: String,
    jumlah_produk: Number,
    category: String,
    sub_category: String,
    produk: {
        type: Array,
        default: []
    },
    total_harga: Number,
    nominal_terbilang: String,
    jumlah_tnc: Number,
    term_n_condition: String,
    approver: {
        type: Array,
        default: []
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
    },
    catatan: String
})

const Offer = mongoose.model("Offer", offer_scheme)

module.exports = Offer