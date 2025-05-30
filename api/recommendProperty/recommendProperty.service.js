const queries = require("./recommendProperty.queries");
const redis = require('../../helper/redisClient');

exports.getRecommendProperty = async (req, res, next) => {
    const findQuery = {
        recommendToUserEmail: req.user.email,
    }
    const redisKey = `recommedProperty:${req.user.email}`;
    const cachedRecommendProperty = await redis.get(redisKey);
    if(cachedRecommendProperty){
        return res.status(200).json({ message: "recommend Property fetched successfully", recommedProperty: JSON.parse(cachedRecommendProperty) });
    }
    const recommendProperty = await queries.getRecommendProperty(findQuery);
    await redis.set(redisKey, JSON.stringify(recommendProperty));
    return res.status(200).json({ message: "Recommend Property fetched successfully", recommendProperty });
}

exports.postRecommendProperty = async (req, res, next) => {
    const createQuery = {
        propertyId: req.body.propertyId,
        recommendByUserId: req.user.id,
        recommendToUserEmail: req.body.email,
    }
    const redisKey = `recommedProperty:${req.body.email}`;
    await redis.del(redisKey);
    const recommendProperty = await queries.postRecommendProperty(createQuery);
    return res.status(200).json({ message: "Recommend Property posted successfully", recommendProperty });
}