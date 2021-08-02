const express = require('express');
const verify = require('../utils/verifyToken');

const router = express.Router();
const commentCtrl = require('../controllers/commentCtrl');

router.post('/create/:productId', verify, commentCtrl.createComment);




module.exports = router;