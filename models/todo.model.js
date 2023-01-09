const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: "no description"
    },
    done: {
        type: Boolean,
        default: false
    },
    is_pinned: {
        type: Boolean,
        default: false
    },
    list_id: {
        type: Schema.Types.ObjectId,
        ref: 'TodoList'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;