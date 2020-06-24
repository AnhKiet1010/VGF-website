const express = require('express');
const router = express.Router();

const policyController = require('../controllers/policy.controller');

router.get('/privacy', policyController.privacy);

// router.get('/cookie', policyController.cookie);

// router.get('/condition', policyController.condition);

module.exports = router;