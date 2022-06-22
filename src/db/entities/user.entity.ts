import { Column, Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column({ name: "type", type: "enum", enumName: "enum_users_type", enum: ["user", "admin"] })
  type!: string;

  @Column({ name: "email", type: "varchar", length: 500, unique: true })
  email!: string;

  @Column({ name: "last_name", type: "varchar", length: 500 })
  lastName!: string;

  @Column({ name: "first_name", type: "varchar", length: 500 })
  firstName!: string;

  @Column({ name: "email_verified", type: "boolean", default: false })
  isEmailVerified!: string;

  @Column({ name: "phone_verified", type: "boolean", default: false })
  isPhoneVerified!: string;
}
