const router = require("express").Router();

const authenticate = require("../../middlewares/auth");
const { validateSchema } = require("../../middlewares/schema-validation");

const service = require("./favProperty.service");
const schema = require("./favProperty.schema");

// const { validateSchema } = require("../../middlewares/schema-validation");


router.get("/property", authenticate, service.getFavProperty);

router.patch("/remove", authenticate, validateSchema(schema.removeFavProperty), service.removeFavProperty);

router.patch("/add", authenticate, validateSchema(schema.addFavProperty), service.addFavProperty);


module.exports = router;
