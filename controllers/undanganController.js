const User = require('../models/user'),
    Undangan = require('../models/undangan'),
    Panitia = require('../models/panitia'),
    lokasi = require('../models/lokasi')

const { tokenGenerate } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bycrypt')
var jwtDecode = require('jwt-decode');
var nodemailer = require('nodemailer');
const { sendEmailHelper } = require('../helpers/emailSender')
class undanganController {
    static sendPayment(req, res, next) {

        // const { receiver, subjectMail, linkImage} = req.body   
        // async function send() {
        //     await sendEmailHelper(
        //     data.pembeli.email,
        //     'Payment Notofication',
        //     req.body.bukti)
        // }
        // send()
        var validate = jwtDecode(req.headers.token)
        Transaksi.findByIdAndUpdate(req.params.paymentId,
            { status: 'wait verification' }, { new: true })
            .populate('pembeli')
            .then(data => {
                console.log(data,
                    data.pembeli.email, req.body.bukti,
                    req.params.paymentId);
                async function send() {
                    await sendEmailHelper(
                        data.pembeli.email,
                        'Payment Notofication',
                        req.body.bukti,
                        req.params.paymentId)
                }
                send()
            })
    }



}

module.exports = undanganController