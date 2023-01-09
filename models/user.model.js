const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        require: true,
        minlength: 2
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;