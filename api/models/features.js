const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {type: Date, default: Date.now},
    title: {type: String, required: true},
    description: {type: String, required: true},
    vote: {type: Number, default: 2},
    img: String
    
}, {timestamps: true});

module.exports = mongoose.model('Features', featureSchema)