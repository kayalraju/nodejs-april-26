const Joi = require("joi");

class UserValidation {
  static CreateUser = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().required().email().messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
      "any.required": "Email is required",
    }),
    password: Joi.string().trim().required().min(6).messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),

    phone: Joi.number().required().messages({
      "number.empty": "Price is required",
      "any.required": "Price is required",
    }),
    image: Joi.object({
      url: Joi.string().trim().required().messages({
        "string.empty": "Image URL is required",
        "any.required": "Image URL is required",
      }),
    }),
  });

  static VerifyUser = Joi.object({
    email: Joi.string().trim().required().email().messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
      "any.required": "Email is required",
    }),
    otp: Joi.number().required().messages({
      "number.empty": "OTP is required",
      "any.required": "OTP is required",
    }),
  });
  static LoginUser = Joi.object({
    email: Joi.string().trim().required().email().messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
      "any.required": "Email is required",
    }),
    password: Joi.string().trim().required().min(6).messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
  });
}

module.exports = UserValidation;
