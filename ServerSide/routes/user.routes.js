var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const {authJWT} = require('../middleware');

router.get('/get',authJWT.verifyToken,authJWT.isUser,(req,res)=>{
    res.json("User ..")
});



module.exports = router;
