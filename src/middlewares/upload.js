var multer = require('multer');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var upload = multer({ storage: storage });

module.exports = function (app) {
   
}