const express = require('express');
const routes = express.Router();

const userController = require('./controllers/userController');

const userValidator = require('./validators/userValidator');

// ************************ USERS ************************
routes.post('/users', userValidator.create, userController.create);
routes.delete('/users/:user_id', userValidator.delete, userController.deleteById);

module.exports = routes;