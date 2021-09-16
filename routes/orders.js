const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken')

const orderCtrl = require('../controllers/orderCtrl');

router.get('/', verify, orderCtrl.getOrders);
router.get('/user_orders', verify, orderCtrl.getUserOrders);
router.post('/current_order', orderCtrl.displayCurrentOrder)



module.exports = router;