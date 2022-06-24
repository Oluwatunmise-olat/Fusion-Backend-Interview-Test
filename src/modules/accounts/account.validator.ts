import Joi from "joi";

export class AccountValidator {
  static schema() {
    return Joi.object({
      amount: Joi.number().required(),
      transaction_ref: Joi.string().required(),
      description: Joi.string(),
    }).options({ allowUnknown: true });
  }
}
