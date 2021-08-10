const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken');
const authCtrl = require('../controllers/authCtrl');
const {upload} = require('../utils/filehelpers');


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/', verify, authCtrl.getUserProfile);
router.get('/all-users', verify, authCtrl.getAllUser);
router.put('/update', verify, upload.single('file'), authCtrl.updateUser)



module.exports = router;