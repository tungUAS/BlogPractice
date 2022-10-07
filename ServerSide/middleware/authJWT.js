const jwt = require("jsonwebtoken");
const config = require("../config/token.config");
const db = require("../models");
const User = db.user;

verifyToken = (req,res,next) => {
    // token stored in header
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            msg:"No token found!"
        })
    }

    jwt.verify(token,config.secret,(error,token_decoded)=>{
        if(error){
            return res.status(401).send({
                msg:"Unauthorized"
            })
        }
        req.user_id = token_decoded.user_id;
        next();
    })
}

isUser = async (req,res,next) => {
    console.log(req.user_id);
    try{
        // req.user_id comes from previous middleware verifyToken
        const userFound = await User.findByPk(req.user_id);
        // https://stackoverflow.com/questions/60354892/getting-results-from-a-many-to-many-relation
        const roles = await userFound.getRoles();
        for(let i=0;i<roles.length;i++){
            if(roles[i].role_id < 2){
                next();
                return;
            }
        }

        return res.status(403).send({
            msg:"Please login ..."
        })
    }catch(error){
        console.log("Error");
    }
}

isAdmin = async (req,res,next) => {
    try{
        // req.user_id comes from previous middleware verifyToken
        const userFound = await User.findByPk(req.user_id);
        // https://stackoverflow.com/questions/60354892/getting-results-from-a-many-to-many-relation
        const roles = await userFound.getRoles();
        for(var i=0;i<roles.length;i++){
            if(roles[i].role_id > 1){
                next();
                return;
            }
        }

        return res.status(403).send({
            msg:"Please login to admin page ..."
        })
    }catch(error){
        console.log("Error");
    }
}

const authJWT = {
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isUser:isUser
}

module.exports = authJWT;