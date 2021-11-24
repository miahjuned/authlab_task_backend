const mongoose = require('mongoose');
const Features = require('../models/features')

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
        .sort({totalComment: -1})
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