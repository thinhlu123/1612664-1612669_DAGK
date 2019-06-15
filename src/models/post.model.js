var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from post');
  },

  allByCat: category => {
    return db.load(`select * from post where category = ${category}`);
  },

  page: (limit, offset) => {
    return db.load(`select * from post limit ${limit} offset ${offset}`);
  },

  pageByCat: (category, limit, offset) => {
    return db.load(`select * from post where category = ${category} limit ${limit} offset ${offset}`);
  },

  count: () => {
    return db.load(`select count(*) as total from post`);
  },

  countByCat: category => {
    return db.load(`select count(*) as total from post where category = ${category}`);
  },

  getAllTag: tID => {
    return db.load(`select tagname from post p, tagpost tp, tag t where tp.IDPost = ${tID} and tp.IDTag = t.ID `);
  },

  single: id => {
    return db.load(`select * from post where ID = ${id}`);
  },

  add: entity => {
    return db.add('post', entity);
  },

  update: entity => {
    return db.update('post', 'ID', entity);
  },

  delete: id => {
    return db.delete('post', 'ID', id);
  },
  allWithStatus: status => {
    return db.load(`select * from post where status = ${status}`);
  }
};
