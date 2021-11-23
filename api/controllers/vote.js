const mongoose = require('mongoose');
const User = require('../models/user');
const Vote = require('../models/vote')
const Features = require('../models/features')


exports.create_vote = async (req, res, next) => {
    try{
        Features.findById(req.body.featureId)
            .then(feature => {
                if(!feature) {
                    return res.status(404).json({
                        message: 'feature not found'
                    });
                }
                const vote = new Vote({
                    _id: mongoose.Types.ObjectId(),
                    date: Date.now(),
                    feature: req.body.featureId,
                    user: req.body.userId,
                    ...req.body
                })
                return vote.save()
            })
            .then(result => {
                console.log('result', result)
                res.status(200).json({
                    message: "successfully done a vote",
                    result
                })
            })
    } catch(err) {
        res.status(404).json({
            message: "vote not added",
            error: err
        });
    }
}


// get all vote
exports.get_All_vote = async (req, res, next) => {
    try {
        Vote.find()
          .populate('user feature','name email title description img')
          .exec()
          .then(docs => {
              const response = {
                  count: docs.length,
                  docs
              }
              console.log('vote', response)
              if (docs.length >= 0) {
                  res.status(200).json(response);
              } else{ 
                  res.status(404).json({
                  message: 'vote empty'
                  });
              };
          })
    } catch (err) {
        res.status(404).json({
            error: err,
            message: 'something wrong, please try again'
        })
    }
  };



// vote updated ************************
exports.updated_vote = async (req, res, next) => {
    try{
        const vote = await Vote.findById(req.params.voteId);

        Object.assign(vote, req.body);
        vote.save();
        res.status(200).json({
            message: 'successfully done a vote'
        });

    } catch(err) {
        res.status(404).json({
            message: 'vote not added',
            error: err
        });
    }
}

// delete feature ************************
exports.delete_vote = async (req, res, next) => {
    try{
        const id = req.params.voteId;
        Vote.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'successfully delete a vote',
                    result,
                });
            });

    } catch(err) {
        res.status(404).json({
            error: err,
            message: 'vote not deleted'
        })
    }
}




//*********************** vote query High To Low******************************* */  
exports.sort_by_vote_High_To_Low = async (req, res, next) => {
    try {
        Features.find()
        // .limit(2)
        .sort({vote: -1})
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "something wrong!",
            });
            } else {
            res.status(200).json({
                data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "vote not found"
        });
    }
}

//*********************** vote query Low To High ******************************* */  
exports.sort_by_vote_Low_To_High = async (req, res, next) => {
    try {
        Features.find()
        // .limit(2)
        .sort({vote: 1})
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "something wrong!",
            });
            } else {
            res.status(200).json({
                data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "vote not found"
        });
    }
}



//*********************** Date query recent_To_previous******************************* */  
exports.sort_by_date_recent_To_previous = async (req, res, next) => {
    try {
        Features.find()
        // .limit(2)
        .sort({date: -1})
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "something wrong!",
            });
            } else {
            res.status(200).json({
                data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "vote not found"
        });
    }
}

//*********************** Date query previous_to_recent ******************************* */  
exports.sort_by_date_previous_to_recent = async (req, res, next) => {
    try {
        Features.find()
        // .limit(2)
        .sort({date: 1})
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "something wrong!",
            });
            } else {
            res.status(200).json({
                data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "vote not found"
        });
    }
}
//*********************** comment query high_to_low ******************************* */  
exports.sort_by_vote_high = async (req, res, next) => {
    try {
        Features.find()
        // .limit(2)
        .sort({comment: 1})
        .exec((err, data) => {
            if (err) {
            res.status(500).json({
                error: "something wrong!",
            });
            } else {
            res.status(200).json({
                data,
                message: "Success",
            });
            }
        });
    } catch {
        res.status(404).json({
            message: "vote not found"
        });
    }
}