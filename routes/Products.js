const express = require('express');

const router = express.Router();
const productCtrl = require('../controllers/product');

router.post('/', productCtrl.creatProduct);


module.exports = router;