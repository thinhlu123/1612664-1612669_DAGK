var express = require('express');
var editorController = require('../../controller/editor/editor.controller');

var router = express.Router();
router.get('/editor', editorController.editor);
module.exports = router;