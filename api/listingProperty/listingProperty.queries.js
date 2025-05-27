const User = require("../../models/user");
const City = require("../../models/city");
const State = require("../../models/state");
const PropertyType = require("../../models/propertyType");
const PropertyTag = require("../../models/propertyTag");
const Amenity = require("../../models/amenity");
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

exports.getCity = () => {
    return City.find();
}

exports.getState = () => {
    return State.find();
}

exports.getPropertyType = () => {
    return PropertyType.find();
}

exports.getPropertyTag = () => {
    return PropertyTag.find();
}

exports.getAmenity = () => {
    return Amenity.find();  
}