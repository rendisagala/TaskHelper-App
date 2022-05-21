const Joi = require("joi");

const validationRegister = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  });
  const validationResult = schema.validate(data);
  return validationResult;
};
const validationTask = (data) => {
  const schema = Joi.object({
    task: Joi.string().min(1),
  });
  const validationResult = schema.validate(data);
  return validationResult;
};

module.exports = { validationRegister, validationTask };
