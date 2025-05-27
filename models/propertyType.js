const mongoose = require('mongoose');

const propertyTypeSchema = new mongoose.Schema({
    type: {type :String, required : true, unique : true},
});

module.exports = mongoose.model('PropertyType', propertyTypeSchema);
