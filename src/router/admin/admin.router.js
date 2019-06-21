var express = require('express')
var router = express.Router();
var bcrypt = require('bcrypt');

var categoryModel = require('../../models/category.model');
var groupCategoryModel = require('../../models/groupcategory.model');

var accountModel = require("../../models/account.model");
var tagModel = require("../../models/tag.model");
var postModel = require("../../models/post.model");
var categoryModel = require("../../models/category.model");
var accountTypeModel = require("../../models/accountype.model");

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
    Promise.all([groupCategoryModel.all(), categoryModel.single(id)]).then(([grrows, rows]) =>{
        if (rows.length > 0){
            res.render('admin/edit-category', {
                error: false,
                category: rows[0],
                groupCategories: grrows
            });
        }
        else{
            res.render('admin/edit-category', {
                error: true
            });
        }
        
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
        res.render('admin/manage-category');
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
router.get('/manage-groupcategory', (req,res) => {
    var p = groupCategoryModel.all();
    p.then(rows => {
        res.render('admin/manage-groupcategory', {
            groups: rows
        })
    }).catch(err => {
        console.log(err);
    });
});
router.get('/add-groupcategory', (req,res) => {
    res.render('admin/add-groupcategory')
});
router.post('/add-groupcategory', (req,res,next) => {
    var entity = {
        group: req.body.group
    }
    groupCategoryModel.add(entity).then(id => {
        res.render('admin/manage-groupcategory');
    }).catch(err => {
        res.end('error occured');
    })
});
router.get('/edit-groupcategory/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('admin/edit-groupcategory', {
            error: true
        });
    }
    groupCategoryModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('admin/edit-groupcategory', {
                error: false,
                group: rows[0]
            });
        } else {
            res.render('admin/edit-groupcategory', {
                error: true
            });
        }
    }).catch(err => {
        res.end('error occured');
    })
})

router.get('/manage-post', (req,res) => {
    Promise.all([postModel.all(), categoryModel.loadAll()]).then(([rows, categories]) => {
        res.render('admin/manage-post',{
           posts: rows,
           categories: categories
        })
      }).catch(err => {
        console.log(err);
      });
});
router.get('/add-post', (req, res, next)=>{
    Promise.all([groupCategoryModel.all(), categoryModel.loadAll()]).then(([groups, categories]) => {
        res.render('admin/add-post',{
           groups: groups,
           categories: categories
        })
      }).catch(err => {
        console.log(err);
      });
})


router.post('/add-post', (req, res) =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    var arrTag = req.body.tags.split(",");
    console.log(arrTag);
    categoryModel.single(req.body.IDCat).then(n =>{
        
        var entity = {
            groupname: n[0].IDGroup,
            category: parseInt(req.body.IDCat),
            title: req.body.title,
            avatar: "./public/image/" + req.body.nameFile,
            date: today,
            author: req.body.authorID,
            content: req.body.chi_tiet_bd,
            status: 0,
            views: 0,
            reason: ""
        }

        postModel.add(entity).then(pid => {
 
            arrTag.forEach(element => {
                console.log(element);
                tagModel.checkExist(element).then(checkTag=>{
                    console.log(checkTag[0].mycheck)
                    if(checkTag[0].mycheck === 1){
                        tagModel.findTag(element).then(idtag =>{
                            tagModel.addTagPost(idtag[0].ID, pid).then().catch(err=>{
                                console.log(err);
                            });
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                    else{
                        tagModel.add({tagname: element}).then(idtag =>{
                            tagModel.addTagPost(idtag, pid).then().catch(err=>{
                                console.log(err);
                            });
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            });
            


            res.render('admin/manage-post');
        }).catch(err => {
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
    })
    
})

router.post('/update-groupcategory', (req, res) => {  
    var entity = {
        ID: req.body.GroupID,
        group: req.body.GroupName
    }
    groupCategoryModel.update(entity).then(n => {
      res.redirect('/admin/manage-groupcategory');
    }).catch(err => {
      res.end('error occured.')
    });
  });

router.post('/delete-groupcategory', (req, res) => {
    groupCategoryModel.delete(req.body.GroupID).then(n => {
      res.redirect('/admin/manage-groupcategory');
    }).catch(err => {
      res.end('error occured.')
    });
})
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
router.get('/add-tag', (req, res) => {
        res.render('admin/add-tag')
})

router.get('/edit-tag/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('admin/edit-tag', {
            error: true
        });
    }

    tagModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('admin/edit-tag', {
                error: false,
                tag: rows[0]
            });
        } else {
            res.render('admin/edit-tag', {
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.end('error occured');
    });
})
  
router.post('/add-tag', (req, res, next) => {
    var entity = {
        tagname: req.body.tag
    }
    console.log(entity);
    tagModel.add(entity).then(id => {
        console.log(id);
        res.render('admin/add-tag');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/update-tag', (req, res) => {  
    var entity = {
        ID: req.body.TagID,
        tagname: req.body.TagName
    }
    tagModel.update(entity).then(n => {
      res.redirect('/admin/manage-tag');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

  router.post('/delete-tag', (req, res) => {
    tagModel.delete(req.body.TagID).then(n => {
      res.redirect('/admin/manage-tag');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })
  router.get('/manage-user', (req,res) => {
    Promise.all([accountModel.all(), categoryModel.loadAll()]).then(([accounts, categories]) => {
        res.render('admin/manage-user',{
           accounts: accounts,
           categories: categories
        })
      }).catch(err => {
        console.log(err);
      });
});

router.get('/add-user', (req, res) => {
    Promise.all([accountTypeModel.all(), groupCategoryModel.all(), categoryModel.loadAll()]).then(([types, groups, categories]) => {
        res.render('admin/add-user',{
           types: types,
           groups, groups,
           categories: categories
        })
      }).catch(err => {
        console.log(err);
      });
})

router.post('/add-user', (req, res, next) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var entity = {
        username: req.body.username,
        password: hash,
        type: req.body.IDType,
        category: req.body.IDCat,
    }
    console.log(entity);
    accountModel.add(entity).then(username => {
        console.log(username);
        res.render('admin/add-user');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.get('/delete-user/:id', (req, res) => {
    accountModel.delete(parseInt(req.params.id)).then(n => {
      res.redirect('/admin/manage-user');
    }).catch(err => {
      res.end('error occured.')
    });
})

router.get('/manage-editor/:username', (req, res) => {
    var username = req.params.username;

    Promise.all([accountModel.singleByUserName(username), groupCategoryModel.all(), categoryModel.loadAll()]).then(([user, groups, categories]) => {
        res.render('admin/manage-editor',{
           user: user[0],
           groups: groups,
           categories: categories
        })
      }).catch(err => {
        console.log(err);
      });
})

router.post('/update-editor', (req, res) => {  
    var entity = {
        username: req.body.username,
        category: req.body.IDCat,
    }
    accountModel.update(entity).then(n => {
      res.redirect('/admin/manage-user');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

  router.get('/add-premium/:username', (req, res) => {
    var username = req.params.username;

    Promise.all([accountModel.singleByUserName(username)]).then(([user]) => {
        res.render('admin/add-premium',{
           user: user[0],
        })
      }).catch(err => {
        console.log(err);
      });
})

router.post('/add-premium', (req, res) => {
    var entity = {
        username: req.body.username,
        premiumdate: req.body.premiumdate,
    }
    accountModel.update(entity).then(n => {
      res.redirect('/admin/manage-user');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })


router.get('/wait-post', (req, res) => {
    postModel.allWithStatus0().then(posts => {
        res.render('admin/wait-post',{
           posts: posts,
        })
      }).catch(err => {
        console.log(err);
      });
})

router.get('/wait-post/public/:id', (req, res) => {
    var entity = {
        ID: parseInt(req.params.id),
        status: 1
    }
    console.log(entity);
    postModel.update(entity).then(n => {
 
      res.redirect('/admin/wait-post');
    }).catch(err => {
        console.log(err);
      res.end('error occured.')
    });
})


module.exports = router;