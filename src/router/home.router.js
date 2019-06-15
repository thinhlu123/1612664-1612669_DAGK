var express = require('express')
var router = express.Router();

var postModel = require('../models/post.model');

router.get('/', (req, res) =>{
    Promise.all([postModel.getTopDate(), postModel.getTopView()]).then(([date, view])=>{
        res.render('home', {
            date: date,
            view: view
        })
    })
})