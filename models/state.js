const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    state : {type :String, required : true, unique : true},
});

module.exports = mongoose.model('State', stateSchema);
