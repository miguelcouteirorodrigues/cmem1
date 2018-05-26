module.exports = (app) => {
    const install_type = require('../controllers/event.controllers.js');

    // Create a new Note
    app.post('/event', install_type.create);

    // Retrieve all Notes
    app.get('/event', install_type.findAll);

    // Retrieve a single Note with noteId
    app.get('/event/:eventId', install_type.findOne);

    // Update a Note with noteId
    app.put('/event/:eventId', install_type.update);

    // Delete a Note with noteId
    app.delete('/event/:eventId', install_type.delete);
}