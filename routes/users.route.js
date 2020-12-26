/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:55
 * @modify date 2020-12-26 20:26:35
 * @desc [description]
 */
var express = require('express');
const UserController = require('../controllers/users.controller');
const { Role } = require('../utils/constants');
const Authenticate = require('../utils/authenticate');
var router = express.Router();

/* GET users listing. */
router.post('/login', UserController.getLogin)
router.post('/', UserController.createUser)
router.get('/profile', Authenticate.authenticate, UserController.getUserProfile)

router.put('/:user_id', Authenticate.authenticate, Authenticate.authorize(Role.Admin), UserController.updateUserById)



module.exports = router;
