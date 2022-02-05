const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    kdvndr: {
        type: String,
        required: [true, 'Masukan Kode Vendor'],
        trim: true,
    },
    namavendor: {
        type: String,
        required: [true, 'Masukan Nama Vendor'],
        trim: true,
    },
    notlp: {
        type: String,
    },
    labelalamat: {
        type: String,
    },
    kota: {
        type: String,
    },
    kodepos: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Vendor', vendorSchema)