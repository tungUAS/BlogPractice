var express = require('express');
var router = express.Router();
const {authJWT} = require('../middleware');
const userController = require('../controller/user.controller')

router.get('/get',authJWT.verifyToken,authJWT.isUser,(req,res)=>{
    res.json("User ..")
});

router.post('/addPost',authJWT.verifyToken,authJWT.isUser,userController.addBlogPost);

module.exports = router;
