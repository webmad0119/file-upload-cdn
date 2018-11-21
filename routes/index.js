const express = require('express');
require('dotenv');
const Movie = require('../models/movie.js');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  Movie.find()
  .then((movies) => {
    res.render('index', { movies });
  })
  .catch((error) => {
    console.log(error);
  })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newMovie = new Movie({title, description, imgPath, imgName})
  newMovie.save()
  .then(movie => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;