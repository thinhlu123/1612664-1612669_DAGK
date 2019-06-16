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
    return db.load(`select p.ID, p.title, p.avatar, p.author, p.date, p.content, p.views, p.summary, gc.groupname from post p, groupcategory gc where p.groupname = gc.ID order by views DESC limit 10`);
  },

  getTopViewWeek:()=>{
    return db.load('select p.ID, p.title, p.avatar, p.author, p.date, p.content, p.views, p.summary, gc.groupname from post p, groupcategory gc where p.groupname = gc.ID and date >= DATE_ADD(CURRENT_DATE(), INTERVAL -7 DAY) ORDER BY views desc limit 3');
  },

  get5Post: catID =>{
    return db.load(`select * from post where category=${catID} limit 6`)
  },

  getPostByCate: ()=>{
    return db.load(`select c.ID as IDCate, p.ID, p.title, p.avatar, c.groupname from post p, groupcategory c,(SELECT ID, groupname, date FROM post WHERE (groupname, date) IN (SELECT groupname, date FROM post where status = 1 GROUP BY date DESC) group by groupname) as t where p.ID=t.ID and p.groupname=c.ID ORDER BY c.ID`)
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
