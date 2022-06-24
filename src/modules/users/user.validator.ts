import Joi from "joi";

export class UserValidator {
  static register() {
    return Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: true } })
        .required(),
      password: Joi.string().required(),
    }).options({ allowUnknown: true });
  }

  static logIn() {
    return Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: true } })
        .required(),
      password: Joi.string().required(),
    }).options({ allowUnknown: true });
  }
}
