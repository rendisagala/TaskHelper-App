const Joi = require("joi");

const validation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    created: Joi.date(),
  });
  return schema.validate(data);
};

module.exports = validation;
