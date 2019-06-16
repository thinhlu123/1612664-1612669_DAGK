var express = require('express')
var router = express.Router();

var postModel = require('../models/post.model');
var groupCategoryModel = require('../models/groupcategory.model');
var categoryModel = require('../models/category.model');

router.get('/', (req, res) => {
    Promise.all([groupCategoryModel.get6(), groupCategoryModel.all(), categoryModel.loadAll(), postModel.getTopDate(), postModel.getTopView(), postModel.getTopViewWeek()])
    .then(([get6, groups, categories, dates, views, viewWeeks]) => {
      res.render('home',{
         get6: get6,
         groups: groups,
         categories: categories,
         dates: dates,
         views: views,
         viewWeeks: viewWeeks
      })
    }).catch(err => {
      console.log(err);
    });
  });

module.exports = router;