const mongoose = require('mongoose')

const confirm_scheme = new mongoose.Schema({
    nama_penerbit: String,
    tanggal_surat: Date,
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
    tanggal_referensi: Date,
    jenis_permohonan: String,
    jumlah_produk: Number,
    category: String,
    sub_category: String,
    produk: {
        type: Array,
        default: []
    },
    tanggal_kegiatan: Date,
    total_harga: Number,
    nominal_terbilang: String,
    jumlah_tnc: Number,
    term_n_condition: {
        type: Array,
        default: []
    },
    approver: {
        type: String,
        default: "unset"
    },
    submitted_by: String,
    revisi: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ['submitted', 'approved', 'need revision', 'rejected', 'done'],
        default: 'submitted'
    },
    template: [],
    drive_id: {
        type: String,
        default: 'unset'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    option: String,
    catatan: String
})

const Confirm = mongoose.model("Confirm", confirm_scheme)

module.exports = Confirm