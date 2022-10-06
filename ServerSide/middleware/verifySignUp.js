const { json } = require('sequelize');
const db = require('../models')
const User = db.user;

checkDuplicateData = async (req,res,next) => {
    const isValidName = await User.findOne({
        where:{
            user_name:req.body.user_name
        }
    })

    const isValidEmail = await User.findOne({
        where:{
            user_email:req.body.user_email
        }
    })

    if(isValidEmail || isValidName){
        res.status(500).json("Username or Email already in use");
        return;
    }

    next();
}

const verifySignUp = {
    checkDuplicateData:checkDuplicateData
}

module.exports = verifySignUp;