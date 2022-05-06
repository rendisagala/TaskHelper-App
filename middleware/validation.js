const Joi = require("joi");
const User = require("../models/users");

const validation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    created: Joi.date(),
  });
  const validationResult = schema.validate(data);
  return validationResult;
};

module.exports = { validation };
