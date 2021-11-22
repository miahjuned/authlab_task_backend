const mongoose = require("mongoose");
const Features = require("../models/features");
const User = require('../models/user')
// Get all Features from database *********
exports.get_All_features = async (req, res, next) => {
  try {
    Features.find()
        .populate('user vote','name email vote comment')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                docs
            }
            console.log('features', response)
            if (docs.length >= 0) {
                res.status(200).json(response);
            } else{ 
                res.status(404).json({
                message: 'feature empty'
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


// Create feature ******************
exports.create_feature = async (req, res, next) => {
    try{
        User.findById(req.body.userId)
            .then(user => {

           console.log("user", user)
            const feature = new Features({
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                description: req.body.description,
                // date: new Date(),
                date: Date.now(),
                user: req.body.userId
            })
            return feature.save()
        })
        .then(result => {
            console.log('result',result)
            res.status(200).json({
                message: 'successfully create a feature request',
                result
            })
        });

    } catch(err){
        res.status(404).json({
            error: err,
            message: 'feature request not added'
        });
    }
}

// Get single feature ********************

exports.get_single_feature = async (req, res, next) => {
    try{
        const id = req.params.featureId;
        Features.findById(id)
            .populate('user','name email')
            .exec()
            .then(docs => {
                console.log('single feature', docs);
                if (docs)  {
                    res.status(200).json({
                        message: 'successfully find a feature',
                        docs
                    });
                } else {
                    res.status(400).json({
                        message: 'No valid entry found for provided ID!'
                    });
                }
            })
    } catch(err) {
        res.status(404).json({
            error: err,
            message: 'Not valid id found'
        })
    }
}

// feature updated ************************
exports.updated_feature = async (req, res, next) => {
    try{
        const feature = await Features.findById(req.params.featureId);

        Object.assign(feature, req.body);
        feature.save();
        res.status(200).json({
            message: 'successfully a feature updated'
        });

    } catch(err) {
        res.status(404).json({
            message: 'feature not updated',
            error: err
        });
    }
}

// delete feature ************************

exports.delete_feature = async (req, res, next) => {
    try{
        const id = req.params.featureId;
        Features.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'successfully delete a feature',
                    result,
                });
            });

    } catch(err) {
        res.status(404).json({
            error: err,
            message: 'feature not deleted'
        })
    }
}
