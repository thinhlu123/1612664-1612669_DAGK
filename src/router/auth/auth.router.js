var express = require('express')
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');

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
    premiumdate = null;
    var type = 2;
    var category = null;
    var entity = {
        username: req.body.username,
        password: hash,
        fullname: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        birthday: dob,
        type: type,
        premiumdate: null,
        category: null,
        idfacebook: null
    }
    accountModel.add(entity).then(id => {
        res.redirect('/');
    }).catch(err => {
      console.log(err);
    })
});

router.get('/edit-information/:id', (req,res) => {
  var id = req.params.id;
  accountModel.findByID(id).then(rows => {
    res.render('auth/edit-information', {
      user: rows[0],
    })
  }).catch(err => {
    console.log(err);
  })
})

router.post('/edit-information', (req,res) => {
  var entity = {
    ID: req.body.ID,
    username: req.body.username,
    fullname: req.body.name,
    nickname: req.body.nickname,
    email: req.body.email,
    birthday: req.body.dob,
  }
  accountModel.update(entity).then(n => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
  })
})

router.get('/fb',passport.authenticate('facebook', {scope: ['email']}));
router.get('/fb/cb',passport.authenticate('facebook', {
    failureRedirect: 'back',
    successRedirect: '/'
  })
);

router.post('/logout', (req,res) => {
  req.logOut();
  res.redirect('/');
})

module.exports = router;
