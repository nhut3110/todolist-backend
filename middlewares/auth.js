const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = function authToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log(err, data)
        if (err) res.sendStatus(403)
        else {
            // res.status(200).json(data)
            next()
        }
    })
}