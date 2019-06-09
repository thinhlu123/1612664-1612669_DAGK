var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from groupcategory');
  },
  get6: () => {
    return db.load('select * from groupcategory limit 6');
  },

  single: id => {
    return db.load(`select * from groupcategory where ID = ${id}`);
  },

  add: entity => {
    return db.add('groupcategory', entity);
  },

  update: entity => {
    var id = entity.ID;
    delete entity.ID;
    return db.update('groupcategory', 'ID', entity, id);
  },

  delete: id => {
    return db.delete('groupcategory', 'ID', id);
  }
};
