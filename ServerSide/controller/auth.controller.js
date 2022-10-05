const db = require('../models')
const { json } = require('sequelize');
const User = db.user;

exports.login = async (req,res,next) => {
    try{
        const isValidUsername = await User.findOne({
            where:{
                user_name:req.body.user_name
            }
        })

        const isValidUserPassword = await User.findOne({
            where:{
                user_password:req.body.user_password
            }
        })

        if(!isValidUserPassword || !isValidUsername){
            res.status(500).json("Wrong username or password");
            return;
        }

        return res.status(200).json("Successfully logged in");
    }catch(error){
        console.log(error);
    }
}

exports.register = async (req,res,next) => {
    try{
        const new_user = await User.create({
            user_name:req.body.user_name,
            user_email:req.body.user_email,
            user_password:req.body.user_password
        })    
        await new_user.setRoles(1);
        return res.json("registered");
    }catch(error){
        console.log(error);
    }
}

