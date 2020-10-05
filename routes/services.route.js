const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services.controller');

router.get('/', servicesController.index);

router.get('/vgf/licenses/:id', servicesController.licenses);

router.get('/:sub', servicesController.sub);

router.get('/vgf/token', servicesController.token);

router.get('/vgf/payments', servicesController.payments);

router.get('/vgf/licenses/:category/:id', servicesController.licenseDetail);

module.exports = router;