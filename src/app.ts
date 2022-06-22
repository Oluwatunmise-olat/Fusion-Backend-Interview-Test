import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("__dirname", "../.env") });

import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());

export default app;
