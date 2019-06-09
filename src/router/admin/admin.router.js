var express = require('express')
var router = express.Router();
var adminController = require("../../controller/admin/admin.controller");

var categoryModel = require('../../models/category.model');
var groupCategoryModel = require('../../models/groupcategory.model');

router.get('/add-post', adminController.addPost);
router.get('/manage-category', adminController.manageCategory);
router.get('/manage-post', adminController.managePost);
router.get('/manage-tag', adminController.manageTag);
router.get('/manage-user', adminController.manageUser);

router.get('/add-category', (req, res) => {
  groupCategoryModel.all()
    .then(rows => {
      res.render('admin/add-category', {
        groupCategories: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})


  router.post('/add-category', (req, res, next) => {
    /*var entity = {
      IDGroup: req.body.IDGroup,
      category: req.body.category
    }
    console.log(entity);
    categoryModel.add(entity).then(id => {
      console.log(id);
      res.render('admin/add-category');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });*/
    console.log(req.body.category);
  })


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