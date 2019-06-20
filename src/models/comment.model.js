var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from comment');
  },

  getAllComment: pID => {
    return db.load(`select cmt.IDComment, cmt.IDPost, cmt.date, cmt.content, acc.username from comment cmt, account acc where cmt.user=acc.ID and IDPost = ${pID}`);
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
