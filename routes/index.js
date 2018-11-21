const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/picture');
const upload = multer({ dest: './public/uploads/' });

/* GET home page */
router.get('/', function (req, res, next) {
  Picture.find((err, pictures) => {
    res.render('index', {
      pictures
    })
  })
});



router.post('/upload', upload.single('photo'), (req, res) => {
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
    res.redirect('/');
  });
});

module.exports = router;