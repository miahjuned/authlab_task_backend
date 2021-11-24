const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    password: { type: String, trim: true, required: true},
    img: String

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)