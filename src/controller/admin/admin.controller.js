module.exports.addPost = function(req, res) {
    res.render('admin/add-post');
}

module.exports.manageCategory = function(req,res) {
    res.render('admin/manage-category');
}

module.exports.managePost = function(req,res) {
    res.render('admin/manage-post');
}

module.exports.manageTag = function(req,res) {
    res.render('admin/manage-tag');
}
module.exports.manageUser = function(req,res) {
    res.render('admin/manage-user');
}