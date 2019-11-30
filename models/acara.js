const mongoose = require('mongoose')
const Schema = mongoose.Schema

const produkSchema = new Schema({
    tanggal: {
        type: Date,
        required: [true, `Nama Tag must be filled`]
    },
    tempat: {
        type: Schema.Types.ObjectId,
        ref: 'nikahYukLokasi'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'nikahYukUser'
    },
    panitiaId: {
        type: Schema.Types.ObjectId,
        ref: 'nikahYukPanitia'
    },
}, {
    versionKey: false,
    timestamps: true
})

const nikahYukAcara = mongoose.model('nikahYukAcara', produkSchema)
module.exports = nikahYukAcara