const User = require('../models/user'),
    Undangan = require('../models/undangan'),
    Panitia = require('../models/panitia'),
    lokasi = require('../models/lokasi')
const { tokenGenerate } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bycrypt')
var jwtDecode = require('jwt-decode');
class userController {
    static register(req, res, next) {
        const { nama, email, pass, role } = req.body

        User.create({ nama, email, pass, role: 'client' })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log('okok');

        const { email, pass } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && comparePassword(pass, user.pass)) {
                    let payload = {
                        id: user._id,
                        nama: user.nama,
                        role: user.role
                    }

                    let token = tokenGenerate(payload)
                    res.status(200).json({ id: user._id, token })
                } else {
                    next({
                        status: 400,
                        message: `invalid email/pass`
                    })
                }
            })
            .catch(next)
    }

    static userAll(req, res, next) {

        User.find({
            role: 'client'
        })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static adminAll(req, res, next) {

        User.find({
            role: 'admin'
        })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }
}

module.exports = userController