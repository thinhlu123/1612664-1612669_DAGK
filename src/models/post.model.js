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

  getTopDate: ()=>{
    return db.load(`select * from post ORDER BY UNIX_TIMESTAMP(date) DESC limit 10`);
  },

  getTopView:()=>{
    return db.load(`select * from post order by views DESC limit 10`);
  },

  getTopViewWeek:()=>{
    return db.load('select * from post where date >= DATE_ADD(CURRENT_DATE(), INTERVAL -7 DAY) ORDER BY views desc limit 3');
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
