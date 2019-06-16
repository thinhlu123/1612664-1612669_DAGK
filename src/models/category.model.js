var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select c.ID, g.groupname, c.category from category c, groupcategory g where c.IDGroup = g.ID');
  },
  loadAll: () => {
    return db.load('select * from category');
  },
  allWithDetails: () => {
    return db.load(`
      select c.ID, c.category, count(p.ID) as num_of_products
      from category c left join post p on c.ID = p.ID
      group by c.ID, c.CatName
    `);
  },

  single: id => {
    return db.load(`select * from category where ID = ${id}`);
  },

  add: entity => {
    return db.add('category', entity);
  },

  update: entity => {
    return db.update('category', 'ID', entity);
  },

  delete: id => {
    return db.delete('category', 'ID', id);
  },
};
