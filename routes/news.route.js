const express = require('express');
const router = express.Router();

const newsController = require('../controllers/news.controller');

router.get('/:id', newsController.getNews);

router.get('/search/:categoryId/:page', newsController.getNewsByCategory);
module.exports = router;