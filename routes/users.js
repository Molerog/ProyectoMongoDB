const express = require('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');
const { authentication,isTheUser } = require('../middleware/authentication');


router.get('/', UserController.getAll);
router.get('/confirm/:email', UserController.confirm);
router.post('/login', UserController.login);
router.post('/', UserController.create);
router.delete('/id/:_id',authentication,isTheUser,UserController.delete);
router.put('/id/:_id',authentication, UserController.update);
router.put('/logout',authentication, UserController.logout);
router.get('/user',authentication,UserController.getInfo);


module.exports = router;