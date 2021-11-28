const mongoose = require('mongoose');
const Features = require('../models/features');
// const User = require('../models/user');
const Reply = require('../models/reply');


// create reply ********************
exports.create_reply = async (req, res, next) => {
    try {
        Features.findById(req.body.featureId)
            .then(async features => {
                const reply = new Reply({
                    _id: mongoose.Types.ObjectId(),
                    replyUserId: req.body.replyUserId,
                    replyFeatureId: req.body.replyFeatureId,
                    reply: req.body.reply ,
                    ...req.body
                })
                const replyDone = await reply.save();
                await Features.updateOne(
                    { _id: features._id },
                    { totalComment: replyDone.totalComment}
                );
            
                res.status(200).json({
                  message: "post reply success",
                });
            })

    } catch(err) {
        res.status(404).json({
            error: err,
            message: 'Not valid features Id found'
        })
    }
}



// Get reply ********************

exports.get_reply = async (req, res, next) => {
    try {
        Reply.find()
            .populate('replyUserId replyFeatureId', 'name email img _id title')
            .sort({date: -1})
            .exec()
            .then(reply => {
                const response = {
                    count: reply.length,
                    reply
                }
                console.log(reply);
                if (reply.length >=1) {
                    res.status(200).json(response)
                } else {
                    res.status(404).json({
                        message: 'no reply'
                    })
                }
            })
    } catch(err) {
        res.status(404).json({
            error: err,
            message: 'Not valid features found'
        })
    }
};



// single reply ......................
exports.get_single_reply = async (req, res, next) => {
    try {
        const featureId = req.params.featureId;
        Reply.find({featureId})
            .populate('replyUserId replyFeatureId', 'name email img _id title')
            .sort({date: -1})
            .exec()
            .then(reply => {
                res.status(200).json({
                    message: 'successfully find single reply',
                    reply
                })
            })
    } catch(err) {
        res.status(400).json({
            message: 'No valid entry found by provided ID!'
        });
    }
}


  //************************* reply delete  ***************************************
  
  exports.Reply_deleted = (req, res, next) => {
      const id = req.params.replyId;
    Reply.deleteOne({featureId: id })
        .exec()
        .then(result => {
            
            if (result) {
                Features.findById(id).then( async docs => {
                    await Features.updateOne(
                        { _id: id },
                        { totalComment: docs.totalComment - 1}
                    );
                })
               
            };
            res.status(200).json({
                message: "Reply deleted",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
  };