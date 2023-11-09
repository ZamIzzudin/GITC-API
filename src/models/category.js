const mongoose = require('mongoose')

const category_scheme = new mongoose.Schema({
    nama_kategori: String,
    kode_kategori: String,
    narasi_kategori: String,
    produk_list: Object
})

const Category = mongoose.model("Category", category_scheme)

module.exports = Category