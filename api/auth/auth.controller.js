const router = require("express").Router();
const { validateSchema } = require("../../middlewares/schema-validation");

const service = require("./auth.service");
const schema = require("./auth.schema");

// const { validateSchema } = require("../../middlewares/schema-validation");


router.post("/register",validateSchema(schema.postRegister), service.register);

router.post("/login",validateSchema(schema.postLogin), service.login);



module.exports = router;
