const express = require('express');
const verify = require('../utils/verifyToken');

const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.post('/create', verify, productCtrl.createProduct);
router.get('/', productCtrl.getProducts);
router.put('/update/:productId', verify, productCtrl.updateProduct)
router.delete('/delete/:productId', verify, productCtrl.deleteProduct)




module.exports = router;