module.exports = app => {
    require('./user.routes')(app)
    require('./post.routes')(app)
}