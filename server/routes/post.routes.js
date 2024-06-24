const validateToken = require('../middlewares/validateToken.js')

module.exports = app => {
    const posts = require('../controllers/post.controller.js')

    var router = require('express').Router()

    router.post('/', validateToken, posts.insertPosts)
    router.put('/', validateToken, posts.updatePosts)
    router.get('/', validateToken, posts.getUserPosts)
    router.get('/all', posts.getAllPosts)
    router.delete('/:id', validateToken, posts.deleteOnePost)
    router.delete('/all', validateToken, posts.deleteAllPost)

    app.use('/api/posts', router)
}