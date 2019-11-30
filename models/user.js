const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bycrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
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
    cowok: {
        type: String,
        required: [true, `cowok must be filled`]
    },
    cewek: {
        type: String,
        required: [true, `cewek must be filled`]
    },
    undangan: [{
        type: Schema.Types.ObjectId,
        ref: 'nikahYukUndangan'
    }],
}, {
    versionKey: false,
    timestamps: true
})

userSchema.pre('save', function (next) {
    this.pass = hashPassword(this.pass)
    next()
})

const nikahYukUser = mongoose.model('nikahYukUser', userSchema)
module.exports = nikahYukUser