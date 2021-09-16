const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken');
const authCtrl = require('../controllers/authCtrl');
const {upload} = require('../utils/filehelpers2');


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/', verify, authCtrl.getUserProfile);
router.get('/all-users', verify, authCtrl.getAllUser);
router.put('/update', verify, authCtrl.updateUser)
router.put('/update/avatar', verify, upload.single('file'), authCtrl.updateUserAvatar)
router.put('/cart', verify, authCtrl.creatCart);
router.post('/create-checkout-session', verify, authCtrl.createCheckoutSession);
router.post('/orders_list', verify, authCtrl.getallStripeOrders)




module.exports = router; 