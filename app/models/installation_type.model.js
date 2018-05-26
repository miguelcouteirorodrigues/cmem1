const mongoose = require('mongoose');

const InstallTypeSchema = mongoose.Schema({
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('InstallationType', InstallTypeSchema);