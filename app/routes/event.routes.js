module.exports = (app) => {
    const event = require('../controllers/event.controllers.js');

    // Create a new Event
    app.post('/event', event.create);

    // Retrieve all Events
    app.get('/event', event.findAll);

    // Retrieve a single Event with eventId
    app.get('/event/:eventId', event.findOne);

    // Update an Event with eventId
    app.put('/event/:eventId', event.update);

    // Delete an Event with EventId
    app.delete('/event/:eventId', event.delete);
}