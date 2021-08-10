const express = require('express');
const verify = require('../utils/verifyToken');

const router = express.Router();
const commentCtrl = require('../controllers/commentCtrl');

router.post('/create/', verify, commentCtrl.createComment);
router.post('/get-commentaries', commentCtrl.getCommentaries);


module.exports = router;