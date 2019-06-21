var express = require('express');
var router = express.Router();
var groupCategoryModel = require('../../models/groupcategory.model');
var postModel = require('../../models/post.model');
var categoryModel = require('../../models/category.model');
var tagModel = require('../../models/tag.model');
var commentModel = require('../../models/comment.model');

router.get('/add-post', (req, res)=>{
    Promise.all([groupCategoryModel.all(), categoryModel.loadAll()]).then(([groups, categories]) => {
        res.render('writer/add-post',{
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
        console.log(entity);
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
            


            res.render('writer/writer-posts');
        }).catch(err => {
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
    })
    
})


router.get('/writer-posts/:id', (req, res)=>{
    var authorID = req.params.id;
    Promise.all([postModel.allWithStatus0ByID(authorID), postModel.allWithStatus1ByID(authorID), postModel.allWithStatus2ByID(authorID)]).then(([approvalposts, agreeposts, disagreeposts]) => {
        res.render('writer/writer-posts',{
           approvalposts,
           disagreeposts,
           agreeposts
        })
      }).catch(err => {
        console.log(err);
      });
})

router.get('/edit-post/:id', (req, res) => {
    var id = req.params.id;

    Promise.all([postModel.single(id), tagModel.getTagByPost(id), groupCategoryModel.all(), categoryModel.loadAll()]).then(([postDetail, tags, groups, categories]) =>{
        res.render('writer/edit-post', {
            postDetail: postDetail[0],
            tags: tags,
            groups: groups,
            categories: categories
        })
    }).catch(err =>{
        console.log(err);
    })
})

router.post('/edit-post', (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    var arrTag = req.body.tags.split(",");
    console.log(arrTag);
    categoryModel.single(req.body.IDCat).then(n =>{
        
        var entity = {
            ID: req.body.postID,
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
        console.log(entity);
        postModel.update(entity).then(pid => {
 
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
            


            res.render('writer/writer-posts');
        }).catch(err => {
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router;