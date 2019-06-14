var express = require('express');
var router = express.Router();

var morgan = require('morgan');
var moment = require('moment');

var app = express();
var groupCategoryModel = require('./models/groupcategory.model');
var categoryModel = require('./models/category.model');

var bodyparser = require('body-parser');
<<<<<<< HEAD

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);


=======
require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
>>>>>>> e75e29178261bff615a79a1aed081a24e38bf8b3
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
 
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/admin', require('./router/admin/admin.router'));

app.use('/auth', require('./router/auth/auth.router'));
app.use('/editor', require('./router/editor/editor.router'));
app.use('/post', require('./router/post/post.router'));
app.use(require('./middlewares/auth-local.mdw'));


<<<<<<< HEAD
=======

>>>>>>> e75e29178261bff615a79a1aed081a24e38bf8b3
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  Promise.all([groupCategoryModel.get6(), groupCategoryModel.all(), categoryModel.loadAll()]).then(([get6, groups, categories]) => {
    res.render('home',{
       get6: get6,
       groups: groups,
       categories: categories
    })
  }).catch(err => {
    console.log(err);
  });
});

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