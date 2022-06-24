import Joi from "joi";

export class BeneficiariesValidator {
  static schema() {
    return Joi.object({
      email: Joi.string().required(),
    }).options({ allowUnknown: true });
  }
}
