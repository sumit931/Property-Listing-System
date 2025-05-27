const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Amenity', amenitySchema); 