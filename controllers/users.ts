import { Router } from "express";
import User from "../models/user";
import createUser from "../utils/helper_functions";

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
    try {
        const user = await createUser(username, name, password);
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch {
        response.status(400).json({ error: "Invalid user" });
    }
});

userRouter.delete("/api/users/:id", async (request, response) => {
    const result = await User.deleteOne({ _id: request.params.id });
    response.json(result);
});

export default userRouter;
