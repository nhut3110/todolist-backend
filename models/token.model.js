const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    refresh_token: {
        type: String,
        unique: true,
        require: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;