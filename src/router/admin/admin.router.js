var express = require('express')
var router = express.Router();
var adminController = require("../../controller/admin/admin.controller");

var categoryModel = require('../../models/category.model');
var groupCategoryModel = require('../../models/groupcategory.model');

var accountModel = require("../../models/account.model");
var tagModel = require("../../models/tag.model");
var postModel = require("../../models/post.model");
var categoryModel = require("../../models/category.model");

var express = require('express')
var router = express.Router();

var categoryModel = require('../../models/category.model');
var groupCategoryModel = require('../../models/groupcategory.model');

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

router.get('/edit-category/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('admin/edit-category', {
            error: true
        });
    }
    groupCategoryModel.all().then(grrows => {
        categoryModel.single(id).then(rows => {
            if (rows.length > 0) {
                res.render('admin/edit-category', {
                    error: false,
                    category: rows[0],
                    groupCategories: grrows
                });
            } else {
                res.render('admin/edit-category', {
                error: true
                });
            }   
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });  
})
  
router.post('/add-category', (req, res, next) => {
    var entity = {
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
    });
})

router.post('/update-category', (req, res) => {  
    var entity = {
        ID: req.body.CatID,
        IDGroup: req.body.CatGroup,
        category: req.body.CatName
    }
    categoryModel.update(entity).then(n => {
      res.redirect('/admin/manage-category');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

  router.post('/delete-category', (req, res) => {
    categoryModel.delete(req.body.CatID).then(n => {
      res.redirect('/admin/manage-category');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

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