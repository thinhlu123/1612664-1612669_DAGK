var express = require('express');
var exphbs  = require('express-handlebars');
var adminRouter = require('./router/admin/admin.router');
var authRouter = require('./router/auth/auth.router');
var editorRouter = require('./router/editor/editor.router');
var postRouter = require('./router/post/post.router');
var app = express();
 
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));

app.use(express.static(__dirname + '/public'));
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/editor', editorRouter);
app.use('/post', postRouter);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});
 
app.listen(3000, () => {
    console.log('Web server is running at http://localhost:3000');
});