import { Column, Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "currencies" })
export class Currency extends BaseEntity {
  @Column({ name: "name", unique: true })
  name!: string;

  @Column({ name: "code", unique: true })
  code!: string;

  @Column({ name: "symbol", unique: true })
  symbol!: string;
}
