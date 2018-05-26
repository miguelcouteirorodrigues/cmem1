const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    xCoordinate: Number,
    yCoordinate: Number
},
{
    timestamps: true
});

module.exports = mongoose.model('Location', LocationSchema);