const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todolistSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: "no description"
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const TodoList = mongoose.model('TodoList', todolistSchema);

module.exports = TodoList;