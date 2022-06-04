const express = require('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');
const { authentication,isTheUser } = require('../middleware/authentication');


router.get('/', UserController.getAll);
router.get('/confirm/:email', UserController.confirm);
router.post('/login', UserController.login);
router.post('/', UserController.create);
router.delete('/id/:_id',authentication,isTheUser,UserController.delete);
router.put('/id/:_id',authentication,isTheUser, UserController.update);
router.put('/logout',authentication,isTheUser, UserController.logout);
router.get('/user',authentication,UserController.getInfo);
router.get('/id/:_id', UserController.getById);
router.get('/search/:name', UserController.getUserByName);
router.put('/follow/:_id',authentication, UserController.followUser);
router.put('/unfollow/:_id',authentication, UserController.unFollowUser);


module.exports = router;