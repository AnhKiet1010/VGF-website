const express = require('express');
const router = express.Router();

const mallController = require('../controllers/mall.controller');

router.get('/', mallController.mall);

module.exports = router;