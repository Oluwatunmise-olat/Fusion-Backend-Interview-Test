import { CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from ".";

@Entity({ name: "beneficiaries" })
export class Beneficiary {
  @ManyToMany(() => User, (user) => user.id, { eager: true })
  @PrimaryColumn({ unique: true, name: "source_id", type: "int" })
  source!: User;

  @ManyToMany(() => User, (user) => user.id, { eager: true })
  @PrimaryColumn({ unique: true, name: "target_id", type: "int" })
  target!: User;

  @CreateDateColumn({ type: "timestamp" })
  created_at?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  update_at?: Date;
}
