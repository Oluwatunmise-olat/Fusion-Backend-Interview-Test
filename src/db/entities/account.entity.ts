import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity, Currency, User } from ".";

@Entity({ name: "accounts" })
export class Account extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Currency, (currency) => currency.id, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn({ name: "currency_id" })
  currency!: Currency;
}
