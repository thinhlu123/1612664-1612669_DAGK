var express = require('express');
var router = express.Router();
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var adminRouter = require('./router/admin/admin.router');
var authRouter = require('./router/auth/auth.router');
var editorRouter = require('./router/editor/editor.router');
var postRouter = require('./router/post/post.router');
var app = express();
var groupCategoryModel = require('./models/groupcategory.model');
var categoryModel = require('./models/category.model');
 
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/editor', editorRouter);
app.use('/post', postRouter);
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    var p = groupCategoryModel.get6();
    p.then(rows => {
      res.render('home', {
        groups: rows
      })
    }).catch(err => {
      console.log(err);
    })
    var q = categoryModel.all();
    q.then(rows => {
      res.render('home', {
        categories: rows
      })
    }).catch(err => {
      console.log(err);
    })
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