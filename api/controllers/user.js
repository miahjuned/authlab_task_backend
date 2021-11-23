const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



// email validation middleware
const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};



  //************************* create an account  ***************************************
exports.userRegister = async (userData, role, res) => {
    try{

        //  the email validate check
        let emailNotRegistered = await validateEmail(userData.email);
        if (!emailNotRegistered) {
            return res.status(404).json({
                message: `Email is already registered.`,
                success: false
            });
        } else {

        // Get the hashed password
        const password = await bcrypt.hash(userData.password, 12);

        // create user
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            ...userData,
            password,
            role
        });

        await newUser.save();
        return res.status(201).json({
            message: 'successfully create an account',
            success: true
        });
    }

    } catch(err) {
        return res.status(500).json({
            message: 'Unable to create your account',
            success: false,
            error: err
        });
    }
};





  //************************* Login***************************************

exports.userLogin = async (userLoginInfo, res) => {

    let { email, password } = userLoginInfo;
    // Check user login email is in the database
    const user = await User.findOne({ email });
    
console.log('user', user)
    if (!user) {
        return res.status(404).json({
            message: `Email is not found`,
            success: false
        });
    }


    // check role
    // if (user.role != role) {
    //     return res.status(403).json({
    //         message: 'role not found',
    //         success: false
    //     });
    // }

    // password check
    let passwordIsMatch = await bcrypt.compare(password, user.password);
    if (passwordIsMatch) {
        let token = jwt.sign(
            {
                user_id: user._id,
                role: user.role,
                email: user.email,
                name: user.name
            },
            process.env.JWT_KEY,
            { expiresIn: '3 days'}
        );
        let result = {
            role: user.role,
            email: user.email,
            name: user.name,
            token: `Bearer ${token}`,
            expiresIn: 72

        };

        return res.status(200).json({
            ...result,
            message: 'Congrats! You are now logged in.',
            success: true
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password.",
            success: false
        })
    }

}




//************************* Get single user  ***************************************

exports.single_user = (req, res, next) => {
    User.findById({ _id: req.params.userId })
        .exec()
        .then( doc => {
            console.log('single user', doc)
            if (doc) {
                res.status(201).json({
                    message: "successfully get all single user",
                    doc
                });
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID!'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: "single user not found"
            });
        });
  };
  
  
  
  
  //************************* Get All users ***************************************
  
  exports.all_user = (req, res, next) => {
    User.find()
        .exec()
        .then( result => {
  
            console.log('all user', result);
            if (result.length >= 1) {
                res.status(201).json({
                    count: result.length,
                    message: "successfully get all user",
                    result
                });
            } else {
                res.status(400).json({
                    message: 'No entry found for provided ID!'
                });
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
  };
  
  
  
  //************************* updated user  ***************************************
  
  exports.updated_user = async (req, res, next) => {
    try {
        const products = await User.findById(req.params.userId);
        
        Object.assign(products, req.body);
        products.save();
  
        res.status(200).json({
            message: 'successfully updated a user info.',
        });
  
    } catch {
        res.status(404).json({
            message: "user not updated"
        });
    }
  }
  
  //************************* User delete  ***************************************
  
  exports.user_deleted = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then( result => {
            res.status(200).json({
                message: "User deleted",
                user: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
  };