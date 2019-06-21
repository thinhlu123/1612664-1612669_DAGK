var express = require('express');
var postModel = require('../../models/post.model');
var categoryModel = require('../../models/category.model');
var tagModel = require('../../models/tag.model');
var commentModel = require('../../models/comment.model');

var router = express.Router();
router.get('/post-detail/:id', (req, res) =>{
  var id = req.params.id;
  Promise.all([postModel.single(id), tagModel.getTagByPost(id), commentModel.getAllComment(id), commentModel.all()]).then(([row, tags, pComment, comment])=>{
    entity = {
      ID: id,
      views: row[0].views + 1
    }
    postModel.update(entity).then(id=>{
      postModel.get5Post(row[0].category).then(post_5 => {
      
        res.render('post/post-detail',{
          post: row[0],
          post_5: post_5,
          tags: tags,
          pComment: pComment,
          comment: comment
        })
      })
    }).catch(err => {console.log(err)})
    
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
       total: count[0].total,
       categories: categories,
       pages: pages
    })
  }).catch(err => {
    console.log(err);
    res.end('error occured');
  });
});

router.get('/list-post/groupcategory/:groupcategory', (req, res) => {
  var groupcategory = req.params.groupcategory;
  var page = req.query.page || 1;
  if (page < 1)
      page = 1;
  var limit = 6;
  var offset = (page - 1)* limit;
  
  

  Promise.all([postModel.pageByGroupCat(groupcategory, limit, offset),postModel.countByGroupCat(groupcategory), categoryModel.loadAll()]).then(([posts, count, categories]) => {
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
       total: count[0].total,
       categories: categories,
       pages,
       groupcate: groupcategory
    })
  }).catch(err => {
    console.log(err);
    res.end('error occured');
  });
});


router.get('/list-post/category/:category', (req, res) => {
  var category = req.params.category;
  var page = req.query.page || 1;
  if (page < 1)
      page = 1;
  var limit = 6;
  var offset = (page - 1)* limit;
  
  

  Promise.all([postModel.pageByCat(category, limit, offset),postModel.countByCat(category), categoryModel.loadAll()]).then(([posts, count, categories]) => {
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
       total: count[0].total,
       categories: categories,
       pages,
       cate: req.params.category
    })
  }).catch(err => {
    console.log(err);
    res.end('error occured');
  });
});

router.get('/list-post/tag/:tag', (req, res) => {
  var tag = req.params.tag;
  var page = req.query.page || 1;
  if (page < 1)
      page = 1;
  var limit = 6;
  var offset = (page - 1)* limit;
  
  

  Promise.all([postModel.pageByTag(tag, limit, offset),postModel.countByTag(tag), categoryModel.loadAll()]).then(([posts, count, categories]) => {
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
       total: count[0].total,
       categories: categories,
       pages,
       tag: tag
    })
  }).catch(err => {
    console.log(err);
    res.end('error occured');
  });
});

router.get('/list-post/page/:page', (req,res) => {
  var page = req.params.page;
  var limit = 6;
  var offset = (page - 1)* limit;
    postModel.page(limit, offset).then(posts => {
      res.render('page/page-posts', {
        posts
      })
    }).catch(err => {
      console.log(err);
    })
})

router.get('/list-post/groupcategory/:groupcategory/page/:page', (req,res) => {
  var groupcategory = req.params.groupcategory;
  var page = req.params.page;
  var limit = 6;
  var offset = (page - 1)* limit;
    postModel.pageByGroupCat(groupcategory, limit, offset).then(posts => {
      res.render('page/page-posts', {
        posts
      })
    }).catch(err => {
      console.log(err);
    })
})

router.get('/list-post/category/:category/page/:page', (req,res) => {
  var category = req.params.category;
  var page = req.params.page;
  var limit = 6;
  var offset = (page - 1)* limit;
    postModel.pageByCat(category, limit, offset).then(posts => {
      res.render('page/page-posts', {
        posts
      })
    }).catch(err => {
      console.log(err);
    })
})

router.get('/list-post/tag/:tag/page/:page', (req,res) => {
  var tag = req.params.tag;
  var page = req.params.page;
  var limit = 6;
  var offset = (page - 1)* limit;
    postModel.pageByTag(tag, limit, offset).then(posts => {
      res.render('page/page-posts', {
        posts
      })
    }).catch(err => {
      console.log(err);
    })
})

module.exports = router;