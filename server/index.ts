import express, { Application } from "express";
import Users from "./routers/users";
import Auth from "./routers/auth";
import cors from "cors";

require("dotenv").config({ path: "./config/.env" });
require("express-async-errors");

const app: Application = express();
import { initDb } from "./app/db";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true, optionsSuccessStatus: 200 }));
app.use(cookieParser());
app.use("/api/users", Users);
app.use("/api/auth", Auth);

const PORT = process.env.PORT || 3000;

initDb("auth-fbend");

app.listen(PORT, () => console.log(`Listen to port ${PORT}...`));
