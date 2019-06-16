var express = require('express');
var postController = require('../../controller/post/post.controller');
var postModel = require('../../models/post.model');
var categoryModel = require('../../models/category.model');
var tagModel = require('../../models/tag.model');

var router = express.Router();
router.get('/post-detail/:id', (req, res) =>{
  var id = req.params.id;
  Promise.all([postModel.single(id), tagModel.getTagByPost(id)]).then(([row, tags])=>{
    postModel.get5Post(row[0].category).then(post_5 => {
      res.render('post/post-detail',{
        post: row[0],
        post_5: post_5,
        tags: tags
      })
    })
  })
});

router.get('/list-post', (req, res) => {
    var page = req.query.page || 1;
    if (page < 1)
        page = 1;
    var limit = 6;
    var offset = (page - 1)* limit;
    
    

    Promise.all([postModel.page(limit, offset),postModel.count(), categoryModel.loadAll()]).then(([posts, count, categories]) => {
        var total = count[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++)
        {
            var obj = {value: i, active: i === +page};
            pages.push(obj);
        }
      res.render('post/list-post',{
         posts: posts,
         categories: categories,
         pages
      })
    }).catch(err => {
      console.log(err);
      res.end('error occured');
    });
  });

module.exports = router;