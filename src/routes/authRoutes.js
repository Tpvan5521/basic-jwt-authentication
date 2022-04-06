const express = require('express');
//users_controllers
const getUser = require('../controllers/user.controller').getUser;
const doLogin = require('../controllers/user.controller').doLogin;
const doRegister = require('../controllers/user.controller').doRegister;

const router = express.Router();
//users
router.get('/users/:userId', getUser);
router.post('/users/login', doLogin);
router.post('/users/register', doRegister);

module.exports = router;