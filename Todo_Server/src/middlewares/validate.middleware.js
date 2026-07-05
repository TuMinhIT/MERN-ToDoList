import ApiError from "../utils/apiError.js";

const validate = (schema) => (req, res, next) => {
  console.log("Validating body:", req.body);

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ApiError(400, error.details[0].message, "Validation Error");
  }
  next();
};

export default validate;
