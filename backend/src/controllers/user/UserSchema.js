import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().max(12).required(),
  password: Joi.string().required(),
  role: Joi.string().valid("regular", "admin").optional(),
  avatar: Joi.string().optional(),
  gender: Joi.string().valid("Male", "Female").optional(),
});

export const loginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const getUserSchema = Joi.object({
  type: Joi.string().valid("ID", "USERNAME").required(),
  username: Joi.string().optional(),
  avatar: Joi.string().optional(),
});

export const getUsersSchema = Joi.object({
  username: Joi.string().optional(),
  avatar: Joi.string().optional(),
});
