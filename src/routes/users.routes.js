const router = require('express').Router();

const {
    getUsers,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/users.controller')

router.get('/users', getUsers);
router.post('/users',postUser);
router.put('/users/:id', putUser);
router.delete('/users/:id',deleteUser);

module.exports = router;
