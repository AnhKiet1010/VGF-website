const express = require('express');
const router = express.Router();

const supportController = require('../controllers/support.controller');

/*
    Support Page Education
*/
router.get('/education/:sub', supportController.education);

router.get('/education/trading_knowledge/:category/:page', supportController.trading_knowledge);

router.get('/education/posts/:id', supportController.postsDetail);
/*
    Support Page help & resource
*/
router.get('/help', supportController.help);

// NEWs page
router.get('/news/:page', supportController.news);

module.exports = router;