const User = require('../models/user')
    , Err = require('../services/err')

module.exports = isAdmin = (req, res, next) => {
    if (!req.params.admin) {
        next(new Err('permission', 'A01'))
    }
    next()
}