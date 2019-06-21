var db = require('../utils/db');

module.exports = {
  all: id => {
    return db.load(`select p.*, a.fullname as authorname from post p, account a where p.status = 0 and p.author = a.ID and p.category = 5`)
  },

  single: id => {
    return db.load(`select * from tag where ID = ${id}`);
  },

  add: entity => {
    return db.add('tag', entity);
  },

  update: entity => {
    return db.update('tag', 'ID', entity);
  },

  delete: id => {
    return db.delete('tag', 'ID', id);
  }
};
