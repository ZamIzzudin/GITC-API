const mongoose = require('mongoose')

const confirm_scheme = new mongoose.Schema({
    nama_penerbit: String,
    tanggal_surat: Date,
    nomor_surat: {
        type: String,
        defualt: 'unset'
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
    kategori_produk: String,
    jenis_produk: String,
    tanggal_kegiatan: Date,
    harga: Number,
    jumlah: Number,
    total_harga: Number,
    nominal_terbilang: String,
    term_n_condition: String,
    durasi_kegiatan: String,
    approver: {
        type: String,
        defult: "unset"
    },
    submitted_by: String,
    revisi: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ['submitted', 'approved', 'need revision', 'rejected'],
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

const Confirm = mongoose.model("Confirm", confirm_scheme)

module.exports = Confirm