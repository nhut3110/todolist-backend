const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err))


//Routes here

const todoRouter = require('./routes/todo')
app.use("/todo", todoRouter)

const todolistRouter = require('./routes/todolist')
app.use("/todolist", todolistRouter)


const userRouter = require('./routes/user')
app.use("/auth", userRouter)

const tokenRouter = require('./routes/token')
app.use("/token", tokenRouter)


app.listen(PORT, () => console.log(`backend is running on port ${PORT}`))