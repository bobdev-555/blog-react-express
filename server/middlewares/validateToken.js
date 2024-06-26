const jwt = require('jsonwebtoken')

module.exports = function validateToken(req, res, next) {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    
    try { 
        const token = req.header(tokenHeaderKey)
        const decoded = jwt.verify(token, jwtSecretKey)
        
        const { exp } = decoded;

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > exp) {
            res.status(401).send()
            console.log("expired")
        } else {
            req.userID = decoded.userId
            next()
        }
    } catch (error) {
        res.status(404).send(error)
    }
}