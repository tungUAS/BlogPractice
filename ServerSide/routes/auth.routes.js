var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const {verifySignUp} = require('../middleware');

router.post('/login',controller.login);

router.post('/register',verifySignUp.checkDuplicateData,controller.register);

module.exports = router;
