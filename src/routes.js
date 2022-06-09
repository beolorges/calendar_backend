const express = require('express');
const routes = express.Router();

const userController = require('./controllers/userController');

// ************************ USERS ************************
routes.post('/users', userController.create);
routes.delete('/users/:user_id', userController.deleteById);