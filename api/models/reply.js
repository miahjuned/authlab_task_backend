const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now},
    reply: String,
    featureId: String,
    replyUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    replyFeatureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Features"
    }
}, { timestamps: true});

module.exports = mongoose.model('Reply', replySchema);