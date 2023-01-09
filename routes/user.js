const router = require("express").Router();
const User = require("../models/user.model");
const Token = require("../models/token.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const authToken = require("../middlewares/auth")
const { findOneAndDelete } = require("../models/user.model");
require("dotenv").config()

// register
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            full_name: req.body.full_name,
            username: req.body.username,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        // console.log(user)
        const validated = await bcrypt.compare(req.body.password, user.password)
        if (user && validated) {
            const data = {
                user_id: user._id,
                username: user.username
            }
            const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
            const refreshToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
            // const token = await Token.exists({ user_id: user._id })
            // if (token) {
            //     const newToken = await Token.findOneAndUpdate({ user_id: user._id }, { refresh_token: refreshToken })
            // } else {
            const newToken = new Token({ refresh_token: refreshToken, user_id: user._id })
            const savedToken = await newToken.save()
            // }

            res.status(200).json({ user_id: user._id, full_name: user.full_name, access_token: accessToken, refresh_token: refreshToken })
        }
        else
            res.status(400).json("Something's wrong I can feel it")
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/logout", async (req, res) => {
    try {
        const token = await Token.findOneAndDelete({ refresh_token: req.body.token })
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json(error)
    }

})

router.get("/info/:id", authToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const info = { user_id: user._id, full_name: user.full_name, username: user.username }
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

})

router.patch("/info/:id", authToken, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { full_name: req.body.full_name })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

})

module.exports = router;