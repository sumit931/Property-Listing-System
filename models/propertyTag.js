const mongoose = require('mongoose');


const propertyTagSchema = new mongoose.Schema({
    type: {type :String, required : true, unique : true},
});

module.exports = mongoose.model('PropertyTag', propertyTagSchema);
