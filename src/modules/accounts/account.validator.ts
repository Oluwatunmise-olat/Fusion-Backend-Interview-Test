import Joi from "joi";

export class AccountValidator {
  static schema() {
    return Joi.object({
      amount: Joi.number().required(),
      description: Joi.string(),
    }).options({ allowUnknown: true });
  }

  static transfer() {
    return Joi.object({
      amount: Joi.number().required(),
      email: Joi.string()
        .email({ tlds: { allow: true } })
        .required(),
      description: Joi.string(),
    }).options({ allowUnknown: true });
  }
}
