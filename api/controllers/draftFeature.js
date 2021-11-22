const mongoose = require("mongoose");
const Features = require("../models/features");

// Get all Features from database *********
exports.get_All_features = async (req, res, next) => {
  try {
    Features.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                features: docs
            }
            console.log('features', response)
            if (docs.length >= 0) {
                res.status(200).json(response);
            } else{ 
                res.status(404).json({
                message: 'No feature found'
                });
            };
            // docs.length >= 0 ?
            //     res.status(200).json(response)
            // : res.status(404).json({
            //     message: 'No feature found'
            // })
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

        const feature = new Features({
            _id: mongoose.Types.ObjectId,
            title: req.body.title,
            description: req.body.description,
            // date: new Date(),
            // date: Date.now(),
            date: req.body.date,
            vote: '5'
        })
        return feature.save()
        .then(result => {
            console.log('result',result)
            res.status(200).json({
                message: 'successfully create a feature request',
                feature: result
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
            .exec()
            .then(docs => {
                console.log('single feature', docs);
                docs.length >= 0 ? 
                    res.status(200).json({
                        message: 'successfully find a feature',
                        feature: docs
                    })
                : res.status(400).json({
                    message: 'No valid entry found'
                })
            })
    } catch(err) {
        res.status(404).json({
            error: err
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
                    feature: result,
                });
            });

    } catch(err) {
        res.status(404).json({
            error: err,
            message: 'feature not deleted'
        })
    }
}
