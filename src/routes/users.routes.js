const router = require('express').Router();

const {
    getUsers,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/users.controller')

router.get('/users', getUsers);
router.post('/user',postUser);
router.put('/user/:id', putUser);
router.delete('/user/:id',deleteUser);

module.exports = router;
