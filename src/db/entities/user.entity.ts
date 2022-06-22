import { Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "users" })
export class User extends BaseEntity {}
