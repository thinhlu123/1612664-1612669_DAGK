var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from account');
  },

  singleByUserName: username => {
    return db.load(`select * from account where username = '${username}'`);
  },

  add: entity => {
    return db.add('account', entity);
  },

  update: entity => {
    var username = entity.username;
    delete entity.username;
    return db.update('account', 'username', entity, username);
  },

  delete: id => {
    return db.delete('account', 'username', username);
  }
};