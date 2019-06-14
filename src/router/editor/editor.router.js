var express = require('express');
var router = express.Router();
var editorController = require('../../controller/editor/editor.controller');
var editorModel = require('../../models/editor.model');

router.get('/editor', (req,res) => {
    var p = editorModel.all();
    p.then(rows => {
        res.render('editor/editor', {
            posts: rows
        })
    }).catch(err => {
        console.log(err);
        res.end('error occured');
    });
});
module.exports = router;