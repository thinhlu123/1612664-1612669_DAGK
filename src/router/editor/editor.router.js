var express = require('express');
var router = express.Router();
var editorController = require('../../controller/editor/editor.controller');
var editorModel = require('../../models/editor.model');
var postModel = require('../../models/post.model');
var groupCategoryModel = require('../../models/groupcategory.model');
var categoryModel = require('../../models/category.model');
var tagModel = require('../../models/tag.model');

router.get('/editor', (req,res) => {
    var p = editorModel.all();
    p.then(rows => {
        res.render('editor/editor', {
            posts: rows
        })
    }).catch(err => {
        console.log(err);
        res.end('error occured');
    });
});

router.get('/editor/approval/:id', (req,res) => {
    var id = req.params.id;
    Promise.all([postModel.single(id), groupCategoryModel.all(), categoryModel.loadAll(), tagModel.getTagByPost(id)]).then(([post, groups, categories, tags]) => {
        res.render('editor/approval',{
           post: post[0],
           groups: groups,
           categories: categories,
           tags: tags
        })
      }).catch(err => {
        console.log(err);
      });
});

router.post('/editor/agree', (req,res) => {
    var entity1 = {
        ID: req.body.txtID,
        category: req.body.IDCat,
        date: req.body.date,
        status: 1,
    }
    var entity2 = {
        IDPost: req.body.txtID,

    }
});

router.post('/editor/disagree', (req,res) => {
    var entity = {
        ID: req.body.txtID,
        status: 2,
        reason: req.body.txtReason,
    }
    postModel.update(entity).then(n => {
        res.redirect('/editor/editor');
    }).catch(err => {
        console.log(err);
    })
})

router.get('/delete-tag/:id&:idpost', (req, res) => {
    tagModel.deleteTagInPost(req.params.id).then(n => {
      res.redirect('/editor/editor/approval/' + req.params.idpost);
    }).catch(err => {
      res.end('error occured.')
    });
})

module.exports = router;