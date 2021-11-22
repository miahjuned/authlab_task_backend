const mongoose = require("mongoose");
const Features = require("../models/features");

// Get all Features from database *********
exports.get_all_features = async (req, res, next) => {
  try {
    Features.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                features: docs
            }
            console.log('features', response)
            docs.length >= 0 ?
                res.status(200).json(response)
            : res.status(404).json({
                message: 'No feature found'
            })
        })
  } catch (err) {
      res.status(404).json({
          error: err,
          message: 'something wrong, please try again'
      })
  }
};


// Create feature ******************
exports.create_featur = async (req, res, next) => {
    try{
        
    } catch(err){}
}