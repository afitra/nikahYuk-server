const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bycrypt')
const Schema = mongoose.Schema

const undanganSchema = new Schema({
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
    role: {
        type: String,
        required: [false, `pass must be filled`]
    },
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'nikahYukUser'
    }],
}, {
    versionKey: false,
    timestamps: true
})

undanganSchema.pre('save', function (next) {
    this.pass = hashPassword(this.pass)
    next()
})

const nikahYukUndangan = mongoose.model('nikahYukUndangan', undanganSchema)
module.exports = nikahYukUndangan