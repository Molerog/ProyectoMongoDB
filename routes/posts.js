const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const PostController = require ('../controllers/PostController');
const { authentication, isAuthorPost } = require('../middleware/authentication');

router.get('/', PostController.getAll);
router.get('/id/:_id', PostController.getById);
router.get('/search/:title', PostController.getPostsByName);
router.post('/',authentication,PostController.create);
router.delete('/id/:_id',authentication,isAuthorPost, PostController.delete);
router.put('/id/:_id',authentication,isAuthorPost, PostController.update);
router.get('/postsbypage/',authentication,PostController.getPostsByPage);
router.put('/likes/:_id', authentication,PostController.like);
router.put('/removelikes/:_id',authentication,PostController.removeLike);
router.get('/info/:_id',authentication,PostController.getInfo);

module.exports = router;