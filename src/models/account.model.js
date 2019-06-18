var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select *, t.accounttype as atype from account a, acctype t where a.type = t.ID and a.username <> "admin"');
  },

  singleByUserName: username => {
    return db.load(`select * from account where username = '${username}'`);
  },

  findByID: id => {
    return db.load(`select * from account where ID = ${id}`);
  },

  add: entity => {
    return db.add('account', entity);
  },

  update: entity => {
    return db.update('account', 'ID', entity);
  },

  delete: username => {
    return db.delete('account', 'ID', username);
  }
};