const ctrl = require('./controller')
    , routes = require('express').Router()
    , isAdmin = require('../../../middlewares/isAdmin')

routes.route('/')
    .get((req, res) => res.status(200).send('User page'))
routes.route('/getOneBook')
    .get(ctrl.userGetOneBook)
routes.route('/getUser/:key/:val/:id')
    .get(ctrl.getUsersWithKeyWord)

module.exports = routes