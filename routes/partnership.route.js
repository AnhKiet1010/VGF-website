const express = require('express');
const router = express.Router();

const partnershipController = require('../controllers/partnership.controller');

router.get('/regional', partnershipController.regional);

router.get('/introduce_broker', partnershipController.introduce_broker);

router.get('/affiliate_program', partnershipController.affiliate_program);
module.exports = router;