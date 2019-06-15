var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load(`select * from acctype where ID = 3 or ID = 4`);
  },

  single: id => {
    return db.load(`select * from acctype where ID = ${id}`);
  },

  add: entity => {
    return db.add('acctype', entity);
  },

  update: entity => {
    return db.update('acctype', 'ID', entity);
  },

  delete: id => {
    return db.delete('acctype', 'ID', id);
  }
};
