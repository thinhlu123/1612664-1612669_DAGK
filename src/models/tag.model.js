var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load(`select * from tag`);
  },

  getTagByPost: postID =>{
    return db.load(`select tagname from tag t, tagpost tp where tp.IDPost = ${postID} and tp.IDTag = t.ID`)
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
