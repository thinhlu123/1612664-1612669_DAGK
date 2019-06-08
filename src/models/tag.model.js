var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from tag');
  },

  single: id => {
    return db.load(`select * from tag where ID = ${id}`);
  },

  add: entity => {
    return db.add('tag', entity);
  },

  update: entity => {
    var id = entity.ID;
    delete entity.ID;
    return db.update('tag', 'ID', entity, id);
  },

  delete: id => {
    return db.delete('tag', 'ID', id);
  }
};
