const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {
        const bearerHeader = req.headers['authorization']

        if (bearerHeader)
        {
            const token = bearerHeader.split(' ')[1];
            const decodedToken = jwt.verify(token, 'qwerty321')
            req.userId = decodedToken.userId
            req.token = token
            next()
        }
        else throw new Error('No token present on Authorization header')

    } catch (error) {
        if (error.name === 'TokenExpiredError') res.status(401).json({ok: false, errors: ['Your token expired, please log in again']})
        else res.status(401).json({ok: false, errors: ['Not allowed']})
    }
}