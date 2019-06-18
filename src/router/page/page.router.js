var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    res.render('page/page-posts');
});

module.exports = router;