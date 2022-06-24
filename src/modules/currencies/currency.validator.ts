import Joi from "joi";

export class CurrencyValidator {
  static create() {
    return Joi.object({
      name: Joi.string().required(),
      symbol: Joi.string().required(),
      code: Joi.string().required(),
    }).options({ allowUnknown: true });
  }

  static update() {
    return Joi.object({
      name: Joi.string(),
      symbol: Joi.string(),
      code: Joi.string(),
    }).options({ allowUnknown: true });
  }
}
