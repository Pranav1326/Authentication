const router = require('express').Router();
const auth = require('../controllers/user');

router.get('/', auth.getHome);

router.post('/user/add', auth.addUser);

router.get('/users', auth.getUsers);

router.post('/user/login', auth.login);

module.exports = router;