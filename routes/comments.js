const express = require('express');
const router = express.Router();
const CommentController = require ('../controllers/CommentController');

router.post('/', CommentController.create);
router.get('/', CommentController.getAll);
router.delete('/id/:_id',CommentController.delete);
router.put('/id/:_id', CommentController.update);



module.exports = router;