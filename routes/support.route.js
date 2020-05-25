const express = require('express');
const router = express.Router();

const supportController = require('../controllers/support.controller');

/*
    Support Page Education
*/
router.get('/education/:sub', supportController.education);
/*
    Support Page help & resource
*/
router.get('/help', supportController.help);

// NEWs page
router.get('/news/:page', supportController.news);

module.exports = router;