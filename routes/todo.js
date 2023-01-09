const router = require('express').Router()
let Todo = require("../models/todo.model")
let TodoList = require("../models/todolist.model")
const authToken = require("../middlewares/auth")

// GET ALL TODOS
// router.get("/", async (req, res) => {
//     try {
//         const todos = await Todo.find()
//         res.status(200).json(todos)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// GET TODO BY ID
router.get("/:id", authToken, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).json(todo)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// GET TODO BY LIST ID
router.get("/findByListID/:id", authToken, async (req, res) => {
    try {
        const todos = await Todo.find({ list_id: req.params.id })
        res.status(200).json(todos)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET TODO BY USER ID
router.get("/findByUserID/:id", authToken, async (req, res) => {
    try {
        const todos = await Todo.find({ user_id: req.params.id })
        res.status(200).json(todos)
    } catch (err) {
        res.status(500).json(err)
    }
})

// CREATE TODO
router.post("/", authToken, async (req, res) => {
    const newTodo = new Todo(req.body)

    try {
        const savedTodo = await newTodo.save()
        res.status(200).json(savedTodo)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE TODO
router.patch("/:id", authToken, async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(todo)
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE TODO
router.delete("/:id", authToken, async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json(todo)
    } catch (err) {
        res.status(500).json(err)
    }
})

// PIN TODO
router.patch("/pin/:id", async (req, res) => {
    try {
        const unpinTodo = await Todo.updateMany({ list_id: req.body.list_id }, { $set: { is_pinned: false } })
        // console.log("todo da pin")
        // console.log(unpinTodo)
        const pinTodo = await Todo.findByIdAndUpdate(req.params.id, { $set: { is_pinned: true } })
        // console.log("todo moi pin")
        // console.log(pinTodo)
        res.status(200).json(pinTodo)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UNPIN TODO
router.patch("/unpin/:id", async (req, res) => {
    try {
        const unpinTodo = await Todo.findByIdAndUpdate(req.params.id, { $set: { is_pinned: false } })
        res.status(200).json(unpinTodo)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router