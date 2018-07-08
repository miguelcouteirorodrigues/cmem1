const Event = require('../models/event.model.js');

// Create and Save a new Installation Type
exports.create = (req, res) => {
    // Validate request
    let message;

    if(!req.body.street) {
        message = "Street can not be empty"
    }
    if(!req.body.city) {
        if (message != null) {
            message += ", ";
        }
        message += "City can not be empty"
    }
    if(!req.body.postal_code_1 || !req.body.postal_code_2) {
        if (message != null) {
            message += ", ";
        }
        message += "Postal code can not be empty"
    }
    if(!req.body.description) {
        if (message != null) {
            message += ", ";
        }
        message += "Description can not be empty"
    }
    if(!req.body.installation_type_id || !req.body.installation_type_name) {
        if (message != null) {
            message += ", ";
        }
        message += "Installation Type can not be empty"
    }
    if(!req.body.latitude) {
        if (message != null) {
            message += ", ";
        }
        message += "Latitude can not be empty"
    }
    if(!req.body.longitude) {
        if (message != null) {
            message += ", ";
        }
        message += "Longitude can not be empty"
    }

    if (message != null) {
        return res.status(400).send({
            message: message
        });
    }

    // Create an Installation Type
    const event = new Event({
        street: req.body.street,
        city: req.body.city,
        postal_code_1: req.body.postal_code_1,
        postal_code_2: req.body.postal_code_2,
        finished: false,
        description: req.body.description,
        installation_type_id: req.body.installation_type_id,
        installation_type_name: req.body.installation_type_name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    // Save Installation Type in the database
    event.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Event."
        });
    });
};

// Retrieve and return all installation types from the database.
exports.findAll = (req, res) => {
    Event.find()
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving events."
        });
    });
};

// Find a single installation type with an installTypeId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });            
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving event with id " + req.params.eventId
        });
    });
};

// Update an event identified by the eventId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.finished) {
        return res.status(400).send({
            message: "Finished can not be empty"
        });
    }

    // Find event and update it with the request body
    Event.findByIdAndUpdate(req.params.eventId, {
        finished: req.body.finished
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send(event);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Error updating event with id " + req.params.eventId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });
        }
        res.send({message: "Install Type deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.eventId
            });                
        }
        return res.status(500).send({
            message: "Could not delete event with id " + req.params.eventId
        });
    });
};