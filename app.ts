import config from "./utils/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./controllers/blogs";

const app = express();
app.use(express.json());
app.use(blogRouter);
app.use(cors());

const mongoUrl = config.MONGODB_URI;
if (!mongoUrl) {
    throw new Error("MONGODB_URI not found");
}

mongoose.connect(mongoUrl);

export default app;
