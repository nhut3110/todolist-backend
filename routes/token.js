const router = require("express").Router();
const Token = require("../models/token.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post("/refresh", async (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) res.sendStatus(401)
    else {
        const isExistedToken = await Token.exists({ refresh_token: refreshToken })
        if (!isExistedToken) res.sendStatus(403)
        else {
            jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                console.log(err, data)
                const accessToken = jwt.sign({
                    user_id: data.user_id,
                    username: data.username
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })
                res.status(200).json({ access_token: accessToken })
            })
        }
    }
})

module.exports = router;