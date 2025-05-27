const User = require("../../models/user");
const Property = require("../../models/property");

exports.getProperties = () => {
    return Property.find();
}

exports.createProperty = (data) => {
    return Property.create(data);
}

exports.deleteProperty = (id) => {
    return Property.findOneAndDelete({ id: id });
}

