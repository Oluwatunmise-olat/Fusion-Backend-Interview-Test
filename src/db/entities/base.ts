import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
  @CreateDateColumn({ type: "timestamptz" })
  created_at?: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  update_at?: Date;
}
