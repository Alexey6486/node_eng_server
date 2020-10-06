const expressUsers = require('express');
const usersControllers = require('../controllers/usersController');

const routerUsers = expressUsers.Router();

routerUsers.route('/')
    .get(usersControllers.getAllUsers)
    .post(usersControllers.createUser);

routerUsers.route('/:id')
    .get(usersControllers.getUser)
    .patch(usersControllers.updateUser)
    .delete(usersControllers.deleteUser);

module.exports = routerUsers;