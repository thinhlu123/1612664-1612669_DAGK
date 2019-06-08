var express = require('express')
var router = express.Router();
var adminController = require("../../controller/admin/admin.controller");
var accountModel = require("../../models/account.model");
var tagModel = require("../../models/tag.model");
var postModel = require("../../models/post.model");
var categoryModel = require("../../models/category.model");

router.get('/add-post', adminController.addPost);
router.get('/manage-category', (req,res) => {
    var p = categoryModel.all();
    p.then(rows => {
        res.render('admin/manage-category', {
            categories: rows
        })
    }).catch(err => {
        console.log(err);
    });
});
router.get('/manage-post', (req,res) => {
    var p = postModel.all();
    p.then(rows => {
        res.render('admin/manage-post', {
            posts: rows
        })
    }).catch(err => {
        console.log(err);
    });
});
router.get('/manage-tag', (req,res) => {
    var p = tagModel.all();
    p.then(rows => {
        res.render('admin/manage-tag', {
            tags: rows
        })
    }).catch(err => {
        console.log(err);
    });
});
router.get('/add-tag', (req,res) => {
    var p = tagModel.all();
    p.then(rows => {
        res.render('admin/add-tag', {
            tags: rows
        })
    }).catch(err => {
        console.log(err);
    });
});
router.get('/manage-user', (req,res) => {
    var p = accountModel.all();
    p.then(rows => {
        res.render('admin/manage-user', {
            accounts: rows
        })
    }).catch(err => {
        console.log(err);
    });
});
module.exports = router;