const User = require('../models/user'),
    Undangan = require('../models/undangan'),
    Panitia = require('../models/panitia'),
    lokasi = require('../models/lokasi')
const { tokenGenerate } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bycrypt')
var jwtDecode = require('jwt-decode');

class panitiaController {
    static addProduk(req, res, next) {
        const { nama, harga, stock, deskripsi, watcher, image } = req.body

        Produk.create({ nama, harga, stock, deskripsi, watcher, image })
            .then(produk => {
                res.status(201).json(produk)
            })
            .catch(next)
    }
    static removeProduk(req, res, next) {
        Produk.findByIdAndDelete(req.params.produkId)
            .then(() => {
                res.status(200).json({
                    message: `Delete Produk successfully`
                })
            })
            .catch(next)

    }

    static editProduk(req, res, next) {

        let { nama, harga, stock, deskripsi, watcher, image } = req.body
        image = JSON.stringify(image)

        Produk.findOneAndUpdate({ _id: req.params.produkId }, { $set: { nama, harga, stock, deskripsi, image } })
            .then(data => {
                res.status(200).json({
                    message: `Edit Produk successfully`
                })
            })
            .catch(next)
    }

    static oneProduk(req, res, next) {

        Produk.findById(req.params.produkId)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)


    }
    static allProduk(req, res, next) {

        Produk.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static getCartAll(req, res, next) {
        var validate = jwtDecode(req.headers.token)
        Cart.find({ userId: validate.id })
            .populate('produkId')
            .then((data) => {

                res.status(200).json(data)
            })

    }

    static removeCart(req, res, next) {

        var validate = jwtDecode(req.headers.token)
        var net = 0
        var ID = 0
        Cart.findOne({ userId: validate.id, produkId: req.params.produkId })
            .then((data) => {
                ID = data._id
                net = data.count -= 1
                if (data.count >= 1) {

                    Cart.updateOne({ userId: validate.id, produkId: req.params.produkId },
                        { $set: { count: net } }, { new: true })
                        .then((data) => {
                            res.status(200).json({
                                message: `Remove Produk  form Cart Successfully, You have ${net} items `
                            })

                        })
                } else {
                    Cart.findByIdAndDelete(ID)
                        .then(function (data) {
                            res.status(200).json({
                                message: `Remove Produk  form Cart Successfully `
                            })

                        })
                        .catch(function (err) {
                            res.status(500).json({
                                messege: err.message
                            })
                        })

                }
            })
    }

    static addCart(req, res, next) {
        // console.log(req.headers.token,'>>>>>');

        var validate = jwtDecode(req.headers.token)
        var net = 0
        Cart.findOne({ userId: validate.id, produkId: req.params.produkId })
            .then((data) => {
                // console.log('ini bukan', data);
                if (data == null) {
                    Cart.create({ userId: validate.id, produkId: req.params.produkId })
                        .then(data => {

                            User.updateOne({ _id: validate.id }, { $addToSet: { "cartList": data._id } })
                                .then((dataUser) => {
                                    console.log('berhasil push ', dataUser);

                                    res.status(200).json({
                                        message: `Add Produk  to Cart Successfully `
                                    })

                                })

                        })
                } else {
                    net = data.count += 1
                    // console.log(net, '>>>>>');

                    Cart.findOneAndUpdate({ userId: validate.id, produkId: req.params.produkId },
                        { $set: { count: net } }, { new: true })
                        .populate('produkId')
                        .then((dataCart) => {
                            // console.log('data else', dataCart);


                            User.updateOne({ _id: validate.id }, { $addToSet: { "cartList": dataCart._id } })
                                .then((dataUser) => {

                                    res.status(200).json({
                                        message: `Add Produk  to Cart Successfully, You have ${net} items `,
                                        data: dataCart
                                    })

                                })

                        })

                }

            })


    }

}



module.exports = panitiaController