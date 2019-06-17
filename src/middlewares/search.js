var postModel = require('../models/post.model');

module.exports = function (app) {
    app.get('/search', (req, res)=>{
        var txtSearch = req.query.txtSearch;
        postModel.searchByType(txtSearch, 'title').then(row=>{
            res.render('search',{
                row: row
            })
        }).catch(err=>{
            console.log(err);
        })
    })

    app.post('/search', (req,res)=>{
        var txtSearch = req.body.txtSearch;
        var type = req.body.search_param;
        console.log('hello' + type);
        postModel.searchByType(txtSearch, type).then(row=>{
            res.render('search', {
                row: row
            })
        })
    })
}

