const express = require('express');
const router = express.Router();

const aboutController = require('../controllers/about.controller');

router.get('/', aboutController.index);

router.get('/legal_document', aboutController.legal);

module.exports = router;