const express = require('express');
const router = express.Router();
const CommentController = require ('../controllers/CommentController');
const { authentication, isAuthor } = require('../middleware/authentication');

router.post('/:_id',authentication, CommentController.create);
router.get('/', CommentController.getAll);
router.delete('/id/:_id',authentication,isAuthor,CommentController.delete);
router.put('/id/:_id',authentication,isAuthor, CommentController.update);



module.exports = router;