import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/usersRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";

import db from "./config/db.js";

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
  origin: true,
  credentials: true,
}));

// routes
app.use("/api", usersRouter);
app.use("/api", categoriesRouter);
app.use("/api", transactionsRouter);

// connect DB
db();

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
