const mongoose = require('mongoose');
const voteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    feature:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Features",
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    vote:{ type:Number, required:true },
    comment: { type: String, required: true},
    date: { type: Date, default: Date.now() }

}, { timestamps: true});

module.exports = mongoose.model('Vote', voteSchema)