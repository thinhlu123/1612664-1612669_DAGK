var express = require('express')
var router = express.Router();
var adminController = require("../../controller/admin/admin.controller");

router.get('/add-post', adminController.addPost);
router.get('/manage-category', adminController.manageCategory);
router.get('/manage-post', adminController.managePost);
router.get('/manage-tag', adminController.manageTag);
router.get('/manage-user', adminController.manageUser);
module.exports = router;