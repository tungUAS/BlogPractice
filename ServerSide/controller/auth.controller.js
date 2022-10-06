var jwt = require('jsonwebtoken');
const db = require('../models')
const User = db.user;
const Post = db.post;
const config = require('../config/token.config');
const bcrypt = require('bcrypt');

exports.login = async (req,res) => {
    try{
        const isValidUser = await User.findOne({
            where:{
                user_name:req.body.user_name
            }
        })

        if(!isValidUser){
            res.status(500).json("Wrong username");
            return;
        }

        if(!bcrypt.compareSync(req.body.user_password,isValidUser.user_password)){
            res.status(500).json("Wrong password");
            return;
        }

        var token = jwt.sign({
            user_id:isValidUser.user_id},
            config.secret,{
                expiresIn:60*60
            });

        return res.status(200).json({
            msg:"Successfully logged in",
            accessToken:token
        });
    }catch(error){
        console.log(error);
    }
}

exports.register = async (req,res) => {
    try{
        const new_user = await User.create({
            user_name:req.body.user_name,
            user_email:req.body.user_email,
            user_password:bcrypt.hashSync(req.body.user_password,10)
        })    
        await new_user.setRoles(1);
        return res.json("Successfully registered");
    }catch(error){
        console.log(error);
    }
}


