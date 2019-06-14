var express = require('express')
var bcrypt = require('bcrypt');
var moment = require('moment');
var authController = require('../../controller/auth/auth.controller');
var accountModel = require('../../models/account.model');
var router = express.Router();

router.get('/is-available', (req, res, next) => {
    var user = req.query.username;
    accountModel.singleByUserName(user).then(rows => {
      if (rows.length > 0) {
        return res.json(false);
      }
  
      return res.json(true);
    })
  })

router.get('/sign-up', (req,res,next) => {
    res.render('auth/sign-up');
});

router.post('/sign-up', (req,res,next) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob, 'DD-MM-YYYY').format('YYYY-MM-DD');
    var today = new Date();
    premiumdate = today.setDate(today.getDate() + 7);
    var type = 1;
    var category = 0;
    var entity = {
        username: req.body.username,
        password: hash,
        fullname: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        birthday: dob,
        type: type,
        premiumdate: premiumdate,
        category: category
    }
    accountModel.add(entity).then(id => {
        res.redirect('/auth/login');
    })
});

router.get('/login', (req,res,next) => {
    res.end('LOGIN');
});

module.exports = router;
