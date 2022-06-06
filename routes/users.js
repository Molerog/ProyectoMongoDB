const express = require('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');
const { authentication,isTheUser,isAdmin } = require('../middleware/authentication');
const {uploadUserImages} = require('../middleware/multer');


router.post('/', uploadUserImages.single('imageUser'),UserController.create);
router.get('/', UserController.getAll);
router.get('/confirm/:email', UserController.confirm);
router.post('/login', UserController.login);
router.delete('/id/:_id',authentication,isAdmin,UserController.adminDelete);
router.delete('/', authentication,UserController.userDelete);
router.put('/id/:_id',authentication,isTheUser,uploadUserImages.single('imageUser'), UserController.update);
router.put('/logout',authentication, UserController.logout);
router.get('/user',authentication,UserController.getInfo);
router.get('/id/:_id', UserController.getById);
router.get('/search/:name', UserController.getUserByName);
router.put('/follow/:_id',authentication, UserController.followUser);
router.put('/unfollow/:_id',authentication, UserController.unFollowUser);


module.exports = router;