var express = require('express');
var postController = require('../../controller/post/post.controller');

var router = express.Router();
router.get('/post-detail', postController.postDetail);
module.exports = router;