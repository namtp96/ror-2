const routes = require('express').Router()
	, public = require('./components/public') // Public for everyone.
    //, secure = require('./components/secure') // Only allow user to access.
    , admin = require('./components/admin') // Only allow bcms admin to access.

// define route from component to root
// TODO: authentication & authorization routes.
routes.use('/public/book', public.book)
routes.use('/admin/user', admin.user)

routes.get('/', (req, res) => res.status(200).send('Home page'))

module.exports = routes