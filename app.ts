import config from "./utils/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./controllers/blogs";
import { errorHandler } from "./utils/middleware";
import userRouter from "./controllers/users";
import loginRouter from "./controllers/login";

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(blogRouter);
app.use(userRouter);
app.use(cors());
app.use(errorHandler);

const mongoUrl = config.MONGODB_URI;
if (!mongoUrl) {
    throw new Error("MONGODB_URI not found");
}

mongoose.connect(mongoUrl);

export default app;
