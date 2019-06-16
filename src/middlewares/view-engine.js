var exphbs  = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
var numeral = require('numeral');
var moment = require('moment');

module.exports = function(app) {

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts',
    helpers: {
      ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      },
      slice: function(context, block) {

        var ret = "",
          offset = parseInt(block.hash.offset) || 0,
          limit = parseInt(block.hash.limit) || 5,
          i = (offset < context.length) ? offset : 0,
          j = ((limit + offset) < context.length) ? (limit + offset) : context.length;
        
           
        for(i,j; i<j; i++) {        
          ret += block.fn(context[i]);
        }
        
      return ret;
    }
      ,

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