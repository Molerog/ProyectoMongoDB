const express = require('express');
const router = express.Router();
const UserController = require ('../controllers/UserController');

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.delete('/',UserController.delete);
router.put('/', UserController.update);
// router.post('/login', UserController.login);


module.exports = router;