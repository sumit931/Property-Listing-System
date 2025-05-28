const mongoose = require('mongoose');

const recommendPropertySchema = new mongoose.Schema({
    propertyId: {type :mongoose.Schema.Types.ObjectId},
    recommendToUserEmail: {type :String, required : true},
    recommendByUserId: {type :mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('recommendProperty', recommendPropertySchema);
