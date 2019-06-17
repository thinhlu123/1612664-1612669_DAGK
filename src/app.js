var express = require('express');
var router = express.Router();

var morgan = require('morgan');
var moment = require('moment');

var app = express();
var groupCategoryModel = require('./models/groupcategory.model');
var categoryModel = require('./models/category.model');
var commentModel = require('./models/comment.model');

var bodyparser = require('body-parser');

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);
//require('./middlewares/comment')(app);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

 
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/admin', require('./router/admin/admin.router'));

app.use('/auth', require('./router/auth/auth.router'));
app.use('/editor', require('./router/editor/editor.router'));
app.use('/post', require('./router/post/post.router'));
app.use('', require('./router/home.router'));
app.use(require('./middlewares/auth-local.mdw'));

app.set('view engine', 'hbs');

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
  
  commentModel.add(comment).then(id => {
    console.log('co vao');
      res.json({success: 'on roi'});
  }).catch(err => {
    console.log('loi');
      res.end('error occured');
  })
  
})

app.use((req, res, next) => {
    res.render('404', { layout: false });
  })
  
  app.use((error, req, res, next) => {
    res.render('error', {
      layout: false,
      message: error.message,
      error
    })
  })
  
app.listen(3000, () => {
    console.log('Web server is running at http://localhost:3000');
});