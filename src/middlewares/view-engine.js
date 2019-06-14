var exphbs  = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
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
      },
      format: val => {
        return numeral(val).format('0,0');
      },
      section: express_handlebars_sections()
    }
    
  }));
  app.set('view-engine', 'hbs');
}