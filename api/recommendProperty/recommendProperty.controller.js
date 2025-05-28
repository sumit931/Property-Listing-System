const router = require("express").Router();
const { validateSchema } = require("../../middlewares/schema-validation");

const service = require("./recommendProperty.service");
const schema = require("./recommendProperty.schema");
const authenticate = require("../../middlewares/auth");

