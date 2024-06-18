const validateToken = require('../middlewares/validateToken.js')

module.exports = app => {
    const users = require('../controllers/user.controller.js')

    var router = require('express').Router()

    router.post('/signup', users.create)
    router.post('/signin', users.login)
    router.get('/', validateToken, users.getUsers)

    app.use('/api/users', router)
}