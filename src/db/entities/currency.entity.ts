import { Column, Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "currencies" })
export class Currency extends BaseEntity {
  @Column({ name: "name" })
  name!: string;

  @Column({ name: "code" })
  code!: string;

  @Column({ name: "symbol" })
  symbol!: string;
}
