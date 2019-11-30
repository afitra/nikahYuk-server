const mongoose = require('mongoose')
const Schema = mongoose.Schema
const panitiaSchema = new Schema({
    nama: {
        type: String,
        required: [true, `Name must be filled`]
    },
    email: {
        type: String,
        required: [true, `Email must be filled`,],
        unique: [true, `Email already registered`],
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Invalid email format'
        }
    },
    pass: {
        type: String,
        required: [true, `pass must be filled`]
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'nikahYukAcara'
    }],
    lokasi: [{
        type: Schema.Types.ObjectId,
        ref: 'nikahYukLokasiAcara'
    }],
}, {
    versionKey: false,
    timestamps: true
})
// cartSchema.plugin(require('mongoose-autopopulate'));


const nikahYukPanitia = mongoose.model('nikahYukPanitia', panitiaSchema)
module.exports = nikahYukPanitia