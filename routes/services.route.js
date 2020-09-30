const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services.controller');

router.get('/', servicesController.index);
router.get('/vgf/licenses/:id', servicesController.licenses);
router.get('/:sub', servicesController.sub);
router.get('/vgf/token', servicesController.token);

module.exports = router;