const InstallationType = require('../models/installation_type.model.js');

// Create and Save a new Installation Type
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Installation Type description can not be empty"
        });
    }

    // Create an Installation Type
    const install_type = new InstallationType({
        description: req.body.description
    });

    // Save Installation Type in the database
    install_type.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Installation Type."
        });
    });
};

// Retrieve and return all installation types from the database.
exports.findAll = (req, res) => {
    InstallationType.find()
    .then(install_types => {
        res.send(install_types);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single installation type with an installTypeId
exports.findOne = (req, res) => {
    InstallationType.findById(req.params.installTypeId)
    .then(install_type => {
        if(!install_type) {
            return res.status(404).send({
                message: "Install Type not found with id " + req.params.installTypeId
            });            
        }
        res.send(install_type);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Install Type not found with id " + req.params.installTypeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving install type with id " + req.params.installTypeId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Installation Type content can not be empty"
        });
    }

    // Find installation type and update it with the request body
    InstallationType.findByIdAndUpdate(req.params.installTypeId, {
        description: req.body.description
    }, {new: true})
    .then(install_type => {
        if(!install_type) {
            return res.status(404).send({
                message: "Install Type not found with id " + req.params.installTypeId
            });
        }
        res.send(install_type);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Install Type not found with id " + req.params.installTypeId
            });                
        }
        return res.status(500).send({
            message: "Error updating install type with id " + req.params.installTypeId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    InstallationType.findByIdAndRemove(req.params.installTypeId)
    .then(install_type => {
        if(!install_type) {
            return res.status(404).send({
                message: "Install Type not found with id " + req.params.installTypeId
            });
        }
        res.send({message: "Install Type deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Install Type not found with id " + req.params.installTypeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete install type with id " + req.params.installTypeId
        });
    });
};