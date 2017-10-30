'use strict';

const { Router } = require('express');
const router = Router();

const{ Register, login, logout } = require('../controllers/sharedCtrl');

router.post('/register', Register);

module.exports = router;