import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("__dirname", "../.env") });

export default {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT!),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/db/entities/**/*.entity.{ts,js}"],
  migrations: [__dirname + "/db/migrations/**/*.{ts,js}"],
  seeds: [__dirname + "/db/seeders/*.{ts,js}"],
};
