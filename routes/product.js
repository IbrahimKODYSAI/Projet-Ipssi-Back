const express = require('express');
const verify = require('../utils/verifyToken');
const {upload} = require('../utils/filehelpers');

const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.post('/create', verify, upload.array('files'), productCtrl.createProduct);
router.get('/', productCtrl.getProducts);
router.put('/update', verify, upload.array('files'), productCtrl.updateProduct)
router.delete('/delete/', verify, productCtrl.deleteProduct)
router.post('/details/', productCtrl.getOneProduct)
// router.put('/update/image/:productId', productCtrl.addImageToProduct )




module.exports = router;