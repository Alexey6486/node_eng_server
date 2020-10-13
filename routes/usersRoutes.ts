const expressUsers = require('express');
const usersControllers = require('../controllers/usersController.ts');
const authControllers = require('../controllers/authController.ts');

const routerUsers = expressUsers.Router();

routerUsers.post('/signup', authControllers.signup);
routerUsers.post('/login', authControllers.login);

routerUsers.route('/')
    .get(usersControllers.getAllUsers)
    .post(usersControllers.createUser);

routerUsers.route('/:id')
    .get(usersControllers.getUser)
    .patch(usersControllers.updateUser)
    .delete(usersControllers.deleteUser);

module.exports = routerUsers;