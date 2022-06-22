import { DataSource } from "typeorm";

export const DBSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT!),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["./entities/**/*.entity.{ts, js}"],
  migrations: ["./migrations/**/*.{ts, js}"],
});
