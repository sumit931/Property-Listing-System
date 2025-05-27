const router = require("express").Router();
const { validateSchema } = require("../../middlewares/schema-validation");

const service = require("./favProperties.service");
const schema = require("./favProperties.schema");

// const { validateSchema } = require("../../middlewares/schema-validation");


router.get("/property",service.getProperties);

router.post("/property",validateSchema(schema.postProperty), service.postProperty);

router.delete("/property/:id", validateSchema(schema.deleteProperty), service.deleteProperty);

module.exports = router;
