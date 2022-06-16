const express = require('express');
const routes = express.Router();

const { authenticate, isAuthenticated, userFromSession } = require('./middlewares/authentication');

const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');

const sessionValidator = require('./validators/sessionValidator');
const userValidator = require('./validators/userValidator');
const eventValidator = require('./validators/eventValidator');

// ************************ AUTHENTICATE ************************
routes.get('/authenticate', isAuthenticated);
routes.get('/auth/user', userFromSession);

// ************************ SESSION ************************
routes.post('/login', sessionValidator.signIn, sessionController.signIn);


// ************************ USERS ************************
routes.post('/user', userValidator.create, userController.create);
routes.delete('/user/:user_id', userValidator.delete, userController.deleteById);

// ************************ EVENTS ************************
routes.post('/event', eventValidator.create, authenticate, eventController.create);
routes.post('/event/:user_id/:event_id', eventValidator.accept, authenticate, eventController.acceptEvent);
routes.delete('/event/:user_id/:event_id', eventValidator.delete, authenticate, eventController.delete);
routes.get('/event/:user_id', eventValidator.getByUserId, authenticate, eventController.getAllByUserId);
routes.get('/eventid/:event_id', eventValidator.getByEventId, authenticate, eventController.getByEventId);
routes.put('/event/edit/:event_id', eventValidator.edit, authenticate, eventController.edit);

// ************************ EVENT USERS ************************
routes.delete('/event/reject/:user_id/:event_id', eventValidator.delete, authenticate, eventController.deleteEventUser);


module.exports = routes;