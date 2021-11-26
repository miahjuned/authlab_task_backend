const express = require('express');
const router = express.Router();
const { reply, create_reply, get_reply, single_reply ,get_single_reply } = require('../controllers/reply');

router.get('/', get_reply)
router.get('/:replyId', single_reply)
router.post('/', create_reply)
router.get('/reply-feature/:featureId', get_single_reply)

module.exports = router;