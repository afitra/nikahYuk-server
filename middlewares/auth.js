const { varify } = require('../helpers/jwt')
const User = require('../models/user')
 

function Authentication(req, res, next) {
    try {
        let decode = varify(req.headers.token)
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
}

function Authorization(req, res, next) {

    User.findOne({
        _id: req.params.id,
        role: 'admin'
    })
        .then(event => {
            if (event) {
                next()
            } else {
                next({
                    status: 403,
                    message: `you don't have the authority to do this action`
                })
            }
        })
        .catch(next)
}

module.exports = {
    Authentication,
    Authorization
}