var groupCategoryModel = require('../models/groupcategory.model');
var categoryModel = require('../models/category.model');

module.exports = (req, res, next) => {
    Promise.all([groupCategoryModel.get6(), groupCategoryModel.all(), categoryModel.loadAll()])
  .then(([get6, groups, categories]) => {
    res.locals.get6 = get6;
    res.locals.groups = groups;
    res.locals.categories = categories;
    next();
  }).catch(err => {
    console.log(err);
  });
}
