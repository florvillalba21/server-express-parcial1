const router = require('express').Router();

const {auth} = require('../controllers/login.controller')

router.post('/login', auth);

module.exports = router;
