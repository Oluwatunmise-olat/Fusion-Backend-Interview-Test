import { Entity } from "typeorm";
import { BaseEntity } from ".";

@Entity({ name: "beneficiaries" })
export class Beneficiary extends BaseEntity {}
