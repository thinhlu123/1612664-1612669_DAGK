var express = require('express');


var morgan = require('morgan');

var passport = require('passport');
var app = express();
var groupCategoryModel = require('./models/groupcategory.model');
var categoryModel = require('./models/category.model');

var postModel = require('./models/post.model');

var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/passport-facebook')(app);
require('./middlewares/upload')(app);
require('./middlewares/comment')(app); 
require('./middlewares/search')(app);
app.use(require('./middlewares/auth-local.mdw'));
app.use(require('./middlewares/local.mdw'));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/admin', require('./router/admin/admin.router'));

app.use('/auth', require('./router/auth/auth.router'));
app.use('/editor', require('./router/editor/editor.router'));
app.use('/post', require('./router/post/post.router'));
app.use('', require('./router/home.router'));
app.use('/page', require('./router/page/page.router'));


app.set('view engine', 'hbs');

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('layouts/main', {
        layout: false,
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);

      return res.redirect('/');
    });
  })(req, res, next);
})

app.get('/', (req, res) => {
  Promise.all([groupCategoryModel.get6(), groupCategoryModel.all(), categoryModel.loadAll(), postModel.getTopDate(), postModel.getTopView(), postModel.getTopViewWeek(), postModel.getPostByCate()])
  .then(([get6, groups, categories, dates, views, viewWeeks, postCates]) => {
    res.render('home',{
       get6: get6,
       groups: groups,
       categories: categories,
       dates: dates,
       views: views,
       viewWeeks: viewWeeks,
       postCates: postCates
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