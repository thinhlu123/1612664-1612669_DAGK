var exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var numeral = require('numeral');

module.exports = function(app) {

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts',
    helpers: {
      ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      },
      formatDate: function(date) {
        return moment(date).format('MM-DD-YYYY');
      }
    },
    section: hbs_sections()
  }));
  app.set('view-engine', 'hbs');
}