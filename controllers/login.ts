import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../models/user";
import { AuthorizedUser } from "../types";

const loginRouter = Router();

loginRouter.post("/api/login", async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "invalid username or password",
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };
    if (!process.env.SECRET) {
        return response.status(500).json({ error: "missing secret in env" });
    }
    const token = jwt.sign(userForToken, process.env.SECRET);

    const authorizedUser: AuthorizedUser = {
        username: user.username,
        name: user.name,
        token: token,
    };
    return response.status(200).json(authorizedUser);
});

export default loginRouter;
