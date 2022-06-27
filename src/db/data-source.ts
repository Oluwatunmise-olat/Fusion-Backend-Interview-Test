import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

const envPath = process.env.NODE_ENV === "test" ? "../../.env.test" : "../../.env";

dotenv.config({ path: path.resolve(__dirname, `${envPath}`) });

export const DBSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT!),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [__dirname + "/entities/**/*.entity.{ts,js}"],
  migrations: [__dirname + "/migrations/**/*.{ts,js}"],
});
