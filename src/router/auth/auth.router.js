var express = require('express')
var authController = require('../../controller/auth/auth.controller');
var router = express.Router();

router.get('/sign-up', authController.signUp);
module.exports = router;
