const jwt = require('jsonwebtoken')

module.exports = function validateToken(req, res, next) {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    
    try {
        const token = req.header(tokenHeaderKey)
        const verified = jwt.verify(token, jwtSecretKey)
        if (verified) {
            res.locals.userID = verified.userId
            next()
        } else {
            res.send("No matched")
        }
    } catch (error) {
        res.status(401).send(error)
    }
}