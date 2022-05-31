const express = require('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/confirm/:email', UserController.confirm);
router.delete('/id/:_id',UserController.delete);
router.put('/id/:_id', UserController.update);
router.post('/login', UserController.login);


module.exports = router;