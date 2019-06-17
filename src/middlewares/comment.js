var commentModel = require('../models/comment.model');

module.exports = function (app) {
    app.post('/post/post-detail/comment/', (req, res)=>{
  
        var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();
      
          today = yyyy + '/' + mm + '/' + dd;
        var comment = {
          IDPost: req.body.IDPost,
          user: "thinhlu123",
          date: today,
          comment: req.body.comment,
          IDParent: -1
        };
        console.log('co vao');
        commentModel.add(comment).then(id => {
            res.json({success: 'on roi'});
        }).catch(err => {
            res.end('error occured');
        })
        
      })
}

