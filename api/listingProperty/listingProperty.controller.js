const router = require("express").Router();
const { validateSchema } = require("../../middlewares/schema-validation");

const service = require("./listingProperty.service");
const schema = require("./listingProperty.schema");
const authenticate = require("../../middlewares/auth");

// const { validateSchema } = require("../../middlewares/schema-validation");


router.get("/property",authenticate,service.getProperties);

router.post("/property",authenticate,validateSchema(schema.postProperty), service.postProperty);

router.delete("/property/:id",authenticate, validateSchema(schema.deleteProperty), service.deleteProperty);

module.exports = router;
