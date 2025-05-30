const router = require("express").Router();
const { validateSchema } = require("../../middlewares/schema-validation");

const service = require("./listingProperty.service");
const schema = require("./listingProperty.schema");
const authenticate = require("../../middlewares/auth");

// const { validateSchema } = require("../../middlewares/schema-validation");

router.get("/my-properties",authenticate,service.getMyProperties);

router.get("/property", authenticate, validateSchema(schema.getProperties), service.getProperties);

router.get("/city",authenticate,service.getCity);

router.get("/state",authenticate,service.getState);

router.get("/propertyType",authenticate,service.getPropertyType);

router.get("/propertyTag",authenticate,service.getPropertyTag);

router.get("/amenity",authenticate,service.getAmenity);

router.post("/property",authenticate,validateSchema(schema.postProperty), service.postProperty);

router.patch("/property/:id", authenticate, validateSchema(schema.patchProperty), service.updateProperty);

router.delete("/property/:id",authenticate, validateSchema(schema.deleteProperty), service.deleteProperty);

module.exports = router;
