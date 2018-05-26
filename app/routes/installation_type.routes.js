module.exports = (app) => {
    const install_type = require('../controllers/installation_type.controllers.js');

    // Create a new Note
    app.post('/installation_type', install_type.create);

    // Retrieve all Notes
    app.get('/installation_type', install_type.findAll);

    // Retrieve a single Note with noteId
    app.get('/installation_type/:installTypeId', install_type.findOne);

    // Update a Note with noteId
    app.put('/installation_type/:installTypeId', install_type.update);

    // Delete a Note with noteId
    app.delete('/installation_type/:installTypeId', install_type.delete);
}