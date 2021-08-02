const express = require('express');
const router = express.Router();
const verify = require('../utils/verifyToken');
const authCtrl = require('../controllers/authCtrl');


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/', verify, authCtrl.getUserProfile);



module.exports = router;