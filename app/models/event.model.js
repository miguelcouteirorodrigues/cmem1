const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    street: String,
    city: String,
    postal_code_1: Number,
    postal_code_2: Number,
    finished: Boolean,
    description: String,
    installation_type_id: String,
    installation_type_name: String,
    latitude: Number,
    longitude: Number
},
{
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);