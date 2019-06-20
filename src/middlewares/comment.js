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
          user: req.body.user,
          date: today,
          content: req.body.comment
        };
        console.log(comment);
        commentModel.add(comment).then(id => {
          
          var rJson = {
            user: req.body.username,
            date: today,
            content: req.body.comment
          }
            res.json(JSON.stringify(rJson));
        }).catch(err => {
            console.log(err);
        })
        
      })
}

