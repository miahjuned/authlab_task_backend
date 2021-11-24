const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {type: Date, default: Date.now},
    title: {type: String, required: true},
    description: {type: String, required: true},
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },    
    status: {
        type: String,
        default: 'under-review',
        enum: ['under-review','planned', 'in-progress', 'complete','my-own']
    },
    vote: {type: Number, default:0},
    comment: String,
    totalComment: {type: Number, default:0},
    reply: String,
    img: String
    
}, {timestamps: true});

module.exports = mongoose.model('Features', featureSchema)