const express = require('express');
const router = express.Router();

const promotionController = require('../controllers/promotion.controller');

// router.get('/gift', promotionController.gift);

router.get('/loyalty_program', promotionController.loyalty);


module.exports = router;