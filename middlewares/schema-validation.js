const { createError } = require("./response");

exports.validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      console.log('Validating request:', {
        body: req.body,
        params: req.params,
        query: req.query
      });

      // Path params validation
      if (schema.path) {
        if (isEmpty(req.params)) {
          return next(
            createError("Path params missing", 400, {
              info: "Please provide path parameters",
            })
          );
        }

        const validation = schema.path.validate(req.params);
        if (validation.error) {
          return next(createError("Path Parameter verification failed", 400, validation.error));
        }
      }

      // Request body validation
      if (schema.body) {
        if (isEmpty(req.body)) {
          return next(
            createError("Request body missing", 400, {
              details: "Please provide a request body",
            })
          );
        }

        const validation = schema.body.validate(req.body, { 
          abortEarly: false,
          stripUnknown: true 
        });
        
        if (validation.error) {
          console.log('Validation error:', validation.error);
          return next(createError("Request body verification failed", 400, validation.error));
        }
        
        // Replace request body with validated data
        req.body = validation.value;
      }

      // Query params validation
      if (schema.query) {
        if (req.query) {
          const validation = schema.query.validate(req.query);
          if (validation.error) {
            return next(createError("Query params verification failed", 400, validation.error));
          }
        }
      }

      return next();
    } catch (err) {
      console.error('Schema validation error:', err);
      return res.status(500).json({ message: "Unexpected error occurred during validation" });
    }
  };
};

function isEmpty(obj) {
  if (obj === undefined || obj === null) return true;
  if (typeof obj !== 'object') return true;
  return Object.keys(obj).length === 0;
}
