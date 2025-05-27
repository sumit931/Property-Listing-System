const User = require("../../models/user");


exports.createUser = (data) => {
    return User.create(data);
}

exports.findUser = (data) => {
    return User.find(data);
}
