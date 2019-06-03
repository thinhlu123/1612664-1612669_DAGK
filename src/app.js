var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});
 
app.listen(3000, () => {
    console.log('Web server is running at http://localhost:3000');
});