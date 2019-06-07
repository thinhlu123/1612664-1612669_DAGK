var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from account');
  },

  single: id => {
    return db.load(`select * from account where f_ID = ${id}`);
  },

  singleByUserName: username => {
    return db.load(`select * from account where f_Username = '${username}'`);
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