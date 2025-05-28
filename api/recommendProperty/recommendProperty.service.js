const queries = require("./recommendProperty.queries");

exports.getRecommendProperty = async (req, res, next) => {
    const findQuery = {
        recommendToUserEmail: req.user.email,
    }
    const recommendProperty = await queries.getRecommendProperty(findQuery);
    return res.status(200).json({ message: "Recommend Property fetched successfully", recommendProperty });
}

exports.postRecommendProperty = async (req, res, next) => {
    const createQuery = {
        propertyId: req.body.propertyId,
        recommendByUserId: req.user.id,
        recommendToUserEmail: req.body.email,
    }
    const recommendProperty = await queries.postRecommendProperty(createQuery);
    return res.status(200).json({ message: "Recommend Property posted successfully", recommendProperty });
}