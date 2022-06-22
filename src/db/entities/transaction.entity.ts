import { Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "transactions" })
export class Transaction extends BaseEntity {}
