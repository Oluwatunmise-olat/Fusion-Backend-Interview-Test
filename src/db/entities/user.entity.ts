import { Column, Entity } from "typeorm";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { BaseEntity } from ".";
import { IJwtPayload } from "../../types";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({ name: "type", type: "enum", enumName: "enum_users_type", enum: ["user", "admin"] })
  type!: "user" | "admin";

  @Column({ name: "email", type: "varchar", length: 500, unique: true })
  email!: string;

  @Column({ name: "last_name", type: "varchar", length: 500 })
  last_name!: string;

  @Column({ name: "first_name", type: "varchar", length: 500 })
  first_name!: string;

  @Column({ name: "email_verified", type: "boolean", default: false })
  is_email_verified!: string;

  @Column()
  password!: string;

  static async hashPassword(plainText: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(plainText, salt);
  }

  static async checkPassword(plainText: string, hashedText: string) {
    return await bcrypt.compare(plainText, hashedText);
  }

  static async generateJWT(payload: IJwtPayload, secret: string) {
    return await JWT.sign(payload, secret, { expiresIn: 60 * 60 + 60 * 60 }); // expires in 2 hour
  }

  static async verifyJWT(token: string, secret: string) {
    return (await JWT.verify(token, secret)) as IJwtPayload;
  }
}
