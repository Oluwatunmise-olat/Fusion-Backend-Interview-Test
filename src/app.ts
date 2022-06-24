import path from "path";
import dotenv from "dotenv";
import * as morgan from "morgan";
dotenv.config({ path: path.resolve("__dirname", "../.env") });
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import express, { Request, Response, NextFunction } from "express";
import errorHandler from "./routes/errors.routes";

const app = express();

app.use([express.json(), express.urlencoded({ extended: false })]);
app.use(helmet());
app.use(cors());
app.use(morgan.default(":method :url :status"));
app.use("/api", routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => errorHandler(error, req, res, next));

export default app;
