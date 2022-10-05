var express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller');
const verify = require('../middleware/verifyLogin');
/* GET users listing. */
router.post('/login',controller.login);

router.post('/register',verify.checkDuplicateData,controller.register);

module.exports = router;
