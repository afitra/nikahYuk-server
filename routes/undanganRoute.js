const router = require('express').Router()
const undanganController = require('../controllers/undanganController')
// const authentic = require('../midleware/authentication')
// const autorize = require('../midleware/authorization')
// const {deleteCode} = process.env
// const { Authentication, Authorization } = require('../middlewares/auth')
router.post('/mail/payment/:paymentId', undanganController.sendPayment)






module.exports = router