var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/image/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var upload = multer({ storage });

module.exports = function (app) {
  app.post('/uploadImage', (req, res, next) => {
    
    upload.single('fuMain')(req, res, err => {
      if (err) {
        return res.json({
          error: err.message
        });
      }

      res.json({
        fileName: req.file.originalname
      });
      
    })
  
  })
}