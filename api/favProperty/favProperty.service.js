const queries = require("./favProperty.queries");
const { ObjectId } = require("mongodb");
const redis = require('../../helper/redisClient');



exports.getFavProperty = async (req, res, next) => {
    const findQuery = {
        _id: new ObjectId(req.user.id)
    }
    const redisKey = `favProperty:${req.user.id}`;
    const cachedFavProperty = await redis.get(redisKey);
    if(cachedFavProperty){
        return res.status(200).json({ message: "Fav Property fetched successfully", favProperty: JSON.parse(cachedFavProperty) });
    }
    const favProperty = await queries.getFavProperty(findQuery);
    await redis.set(redisKey, JSON.stringify(favProperty));
    return res.status(200).json({ message: "Fav Property fetched successfully", favProperty });
}

exports.addFavProperty = async (req, res, next) => {
    const favProperty = await queries.addFavProperty(req.user.id, req.body.propertyId);
    const redisKey = `favProperty:${req.user.id}`;
    await redis.del(redisKey);
    return res.status(200).json({ message: "Fav Property added successfully", favProperty });
}


exports.removeFavProperty = async (req, res, next) => {
    const favProperty = await queries.removeFavProperty(req.user.id, req.body.propertyId);
    const redisKey = `favProperty:${req.user.id}`;
    await redis.del(redisKey);
    return res.status(200).json({ message: "Fav Property removed successfully", favProperty });
}




