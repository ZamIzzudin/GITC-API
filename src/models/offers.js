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
    jabatan: String,
    media_ref: {
        type: String,
        enum: ["Email", "Telepon", "Perjanjian Kerja Sama", "Kesepakatan Pada Tanggal"],
        default: ["Email"]
    },
    tanggal_ref: String,
    jenis_permohonan: String,
    jumlah_produk: Number,
    category: String,
    sub_category: String,
    penawaran_forms: {
        type: Array,
        default: []
    },
    total_biaya: Number,
    nominal_terbilang: String,
    jumlah_tnc: Number,
    TNC: {
        type: Array,
        default: []
    },
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