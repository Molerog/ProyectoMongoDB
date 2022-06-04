const express = require('express');
const router = express.Router();
const CommentController = require ('../controllers/CommentController');
const { authentication, isAuthorComment } = require('../middleware/authentication');

router.post('/',authentication, CommentController.create);
router.get('/', CommentController.getAll);
router.delete('/id/:_id',authentication,isAuthorComment,CommentController.delete);
router.put('/id/:_id',authentication,isAuthorComment,CommentController.update);
router.put('/likes/:_id', authentication,CommentController.like);
router.put('/removelikes/:_id',authentication,CommentController.removeLike);



module.exports = router;