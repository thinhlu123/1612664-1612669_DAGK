var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load(`select * from tag`);
  },

  getTagByPost: postID =>{
    return db.load(`select tagname, ID from tag t, tagpost tp where tp.IDPost = ${postID} and tp.IDTag = t.ID`)
  },

  checkExist: tag =>{
    return db.load(`SELECT EXISTS(SELECT 1 FROM tag WHERE tagname = N'${tag}') AS mycheck`)
  },

  findTag: tag =>{
    return db.load(`select ID from tag where tagname='${tag}'`)
  },

  addTagPost: (tID, pID) =>{
    return db.load(`insert into tagpost values(${pID}, ${tID})`)
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
  },
  deleteTagInPost: id  => {
    return db.delete('tagpost', 'IDTag', id);
  }
};
