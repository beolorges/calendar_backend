const express = require('express');
const routes = express.Router();


const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');

const sessionValidator = require('./validators/sessionValidator');
const userValidator = require('./validators/userValidator');
const eventValidator = require('./validators/eventValidator');

// ************************ SESSION ************************
routes.post('/login', sessionValidator.signIn, sessionController.signIn);


// ************************ USERS ************************
routes.post('/user', userValidator.create, userController.create);
routes.delete('/user/:user_id', userValidator.delete, userController.deleteById);

// ************************ EVENTS ************************
routes.post('/event', eventValidator.create, eventController.create);
routes.post('/event/:user_id/:event_id', eventValidator.accept, eventController.acceptEvent);
routes.delete('/event/:user_id/:event_id', eventValidator.delete, eventController.delete);
routes.get('/event/:user_id', eventValidator.getByUserId, eventController.getAllByUserId);
routes.get('/eventid/:event_id', eventValidator.getByEventId, eventController.getByEventId);

module.exports = routes;