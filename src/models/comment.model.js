var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from comment');
  },

  allByPost: pID => {
    return db.load(`select * from comment where IDPost = ${pID}`);
  },

  pageByPost: (pID, limit, offset) => {
    return db.load(`select * from comment where IDPost = ${pID} limit ${limit} offset ${offset}`);
  },

  single: id => {
    return db.load(`select * from comment where IDComment = ${id}`);
  },

  add: entity => {
    return db.add('comment', entity);
  },

  update: entity => {
    return db.update('comment', 'IDComment', entity);
  },

  delete: id => {
    return db.delete('comment', 'IDComment', id);
  },
};
