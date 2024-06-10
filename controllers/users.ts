import { Router } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.get("/api/users", async (_request, response) => {
    const users = await User.find({});
    response.json(users);
});

userRouter.get("/api/users/:id", async (request, response) => {
    const user = await User.find({ _id: request.params.id });
    response.json(user);
});

userRouter.post("/api/users", async (request, response) => {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

userRouter.delete("/api/users/:id", async (request, response) => {
    const result = await User.deleteOne({ _id: request.params.id });
    response.json(result);
});

export default userRouter;
