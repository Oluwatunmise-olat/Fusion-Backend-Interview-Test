import { QueryFailedError } from "typeorm";
import { DBSource } from "../../db/data-source";
import { Beneficiary, User } from "../../db/entities";
import { IServiceResponse } from "../../types";
import { BodyFieldError, ResourceNotFoundError, ServerError } from "../common/exception-handlers.common";

export class BeneficiariesService {
  private static beneficiariesRepository = DBSource.getRepository(Beneficiary);
  private static userRepository = DBSource.getRepository(User);

  static async add(email: string, userId: number): Promise<IServiceResponse> {
    try {
      const targetUser = await this.userRepository.findOneBy({ email });
      if (!targetUser) throw new ResourceNotFoundError("Resource Not Found");

      await this.beneficiariesRepository.query(`INSERT INTO beneficiaries (source_id, target_id) VALUES (?, ?) `, [
        userId,
        targetUser.id,
      ]);

      return { hasError: false, message: "Success", data: {} };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BodyFieldError({}, "Beneficiary already exists for user");
      }

      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new ServerError();
    }
  }

  static async remove(email: string, userId: number): Promise<IServiceResponse> {
    const targetUser = await this.userRepository.findOneBy({ email });
    if (!targetUser) throw new ResourceNotFoundError("Resource Not Found");
    await this.beneficiariesRepository.query(`DELETE FROM beneficiaries WHERE target_id=? AND source_id=?`, [
      targetUser.id,
      userId,
    ]);

    return { hasError: false, message: "Success", data: {} };
  }

  static async getAll(userId: number): Promise<IServiceResponse> {
    try {
      const data = await this.beneficiariesRepository.query(
        `SELECT email, last_name, first_name FROM beneficiaries JOIN users ON users.id=target_id WHERE source_id = ?`,
        [userId],
      );
      // add pagination
      return { hasError: false, message: "Success", data: { count: data.length, beneficiaries: data } };
    } catch (error) {
      throw new ServerError();
    }
  }
}
