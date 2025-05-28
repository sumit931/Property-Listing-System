const queries = require("./favProperty.queries");
const { ObjectId } = require("mongodb");



exports.getFavProperty = async (req, res, next) => {
    const findQuery = {
        _id: new ObjectId(req.user.id)
    }
    const favProperty = await queries.getFavProperty(findQuery);
    return res.status(200).json({ message: "Fav Property fetched successfully", favProperty });
}

exports.addFavProperty = async (req, res, next) => {
    const favProperty = await queries.addFavProperty(req.user.id, req.body.propertyId);
    return res.status(200).json({ message: "Fav Property added successfully", favProperty });
}


exports.removeFavProperty = async (req, res, next) => {
    const favProperty = await queries.removeFavProperty(req.user.id, req.body.propertyId);
    return res.status(200).json({ message: "Fav Property removed successfully", favProperty });
}




