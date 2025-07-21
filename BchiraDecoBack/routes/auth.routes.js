const express = require('express');
const router = express.Router();
const { login, registerAdmin,Contact } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register', registerAdmin);
router.post('/contact', Contact);

module.exports = router;
