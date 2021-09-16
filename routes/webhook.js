const express = require('express');
const router = express.Router();

const webhookCtrl = require('../controllers/webhookCtrl');

router.post('/', webhookCtrl)


module.exports = router ;