const router = require('express').Router()
const authToken = require("../middlewares/auth")
let Todo = require("../models/todo.model")
let TodoList = require("../models/todolist.model")

// GET ALL TODOLISTS
router.get("/", authToken, async (req, res) => {
    try {
        const todolists = await TodoList.find()
        res.status(200).json(todolists)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET TODOlist BY ID
router.get("/:id", authToken, async (req, res) => {
    try {
        const Todolist = await TodoList.findById(req.params.id)
        res.status(200).json(Todolist)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET TODOLIST BY USER ID
router.get("/findByUserID/:id", authToken, async (req, res) => {
    try {
        const Todolist = await TodoList.find({ user_id: req.params.id })
        res.status(200).json(Todolist)
    } catch (err) {
        res.status(500).json(err)
    }
})

// CREATE TODOlist
router.post("/", authToken, async (req, res) => {
    const newTodolist = new TodoList(req.body)
    try {
        const savedTodolist = await newTodolist.save()
        console.log(savedTodolist + " " + newTodolist)
        res.status(200).json(savedTodolist)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE TODOlist
router.patch("/:id", authToken, async (req, res) => {
    try {
        const Todolist = await TodoList.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(Todolist)
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE TODOlist
router.delete("/:id", authToken, async (req, res) => {
    try {
        const Todolist = await TodoList.findByIdAndDelete(req.params.id)
        res.status(200).json(Todolist)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router