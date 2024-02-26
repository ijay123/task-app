import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.string().required(),
  userId: Joi.string().required(),
});

