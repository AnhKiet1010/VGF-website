const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services.controller');

router.get('/', servicesController.index);
router.get('/:sub', servicesController.sub);
router.get('/forex/:id', servicesController.forexPage);

module.exports = router;