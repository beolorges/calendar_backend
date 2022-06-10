const express = require('express');
const routes = express.Router();

const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');

const sessionValidator = require('./validators/sessionValidator');
const userValidator = require('./validators/userValidator');

// ************************ SESSION ************************
routes.post('/login', sessionValidator.signIn, sessionController.signIn);


// ************************ USERS ************************
routes.post('/users', userValidator.create, userController.create);
routes.delete('/users/:user_id', userValidator.delete, userController.deleteById);

module.exports = routes;