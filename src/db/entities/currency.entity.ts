import { Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "currencies" })
export class Currency extends BaseEntity {}
