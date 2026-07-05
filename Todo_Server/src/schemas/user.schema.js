import Joi from "joi";

// register
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(),
});

// login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(),
});

// update info
export const updateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional().allow(null, ""),
  avatar: Joi.string().uri().allow(null, ""),
});
