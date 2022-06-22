import { Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "accounts" })
export class Account extends BaseEntity {}
