const express = require('express');
const router = express.Router();
const PostController = require ('../controllers/PostController');
const { authentication, isAuthor } = require('../middleware/authentication');

router.get('/', PostController.getAll);
router.get('/id/:_id', PostController.getById);
router.get('/search/:title', PostController.getPostsByName);
router.post('/',authentication,PostController.create);
router.delete('/id/:_id',authentication,isAuthor, PostController.delete);
router.put('/id/:_id',authentication,isAuthor, PostController.update);

module.exports = router;