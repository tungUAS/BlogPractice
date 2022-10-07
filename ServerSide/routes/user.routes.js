var express = require('express');
var router = express.Router();
const {authJWT} = require('../middleware');
const userController = require('../controller/user.controller');
const db = require('../models');
const User = db.user;
const Post = db.post;
const Op = db.Sequelize.Op;

router.get('/get',authJWT.verifyToken,authJWT.isUser,(req,res)=>{
    res.json("User ..")
});

router.post('/addPost',authJWT.verifyToken,authJWT.isUser,userController.addBlogPost);

router.get('/getAllPosts',authJWT.verifyToken,authJWT.isUser,userController.getAllBlogPostsByUserID);

router.get('/getPostsByCat',authJWT.verifyToken,authJWT.isUser,userController.getAllBlogPostByUserIdAndCategory);

router.put('/updatePost',authJWT.verifyToken,authJWT.isUser,userController.updatePost);

module.exports = router;
