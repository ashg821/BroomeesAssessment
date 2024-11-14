const { createUserController } = require('../controllers/user.controller');
const router = require('express').Router();



router.post('/create-user', createUserController);


module.exports = router;