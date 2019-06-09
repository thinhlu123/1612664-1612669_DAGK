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

module.exports = router;