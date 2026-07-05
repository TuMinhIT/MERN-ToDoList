import Joi from "joi";


export const createSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),

  description: Joi.string().trim().allow("").optional(),

  completed: Joi.boolean().optional(),

  category: Joi.string().trim().allow("").optional(),
});



export const updateSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(100)
    .messages({
      "string.base": "Title must be a string"
    }),

  description: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "Description must be a string",
    }),

  completed: Joi.boolean().messages({
    "boolean.base": "Completed must be a boolean",
  }),

  category: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "Category must be a string",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update",
  });

