const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lokasiSchema = new Schema({
    panitia: {
        type: Schema.Types.ObjectId,
        ref: 'nikahYukPanitia'
    },
    nama: {
        type: String,
        required: [true, `Location Name Tag must be filled`]
    },
    kapasitas: {
        type: Number,
        required: [true, `Capasity Tag must be filled`]
    },
    date: {
        type: String,
        required: [true, `date Tag must be filled`]
    },
    Harga: {
        type: String,
        required: [true, `Price Tag must be filled`]
    },
    gambar: [{
        path: { type: String, required: [true, `Price Tag must be filled`] },
    }]
}, {
    versionKey: false,
    timestamps: true
})

const nikahYukLokasi = mongoose.model('nikahYukLokasi', lokasiSchema)
module.exports = nikahYukLokasi