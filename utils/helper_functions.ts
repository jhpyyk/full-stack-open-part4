import User from "../models/user";
import bcrypt from "bcrypt";
import { Request } from "express";

export const createUser = async (
    username: string,
    name: string,
    password: string
) => {
    if (password.length < 3) {
        let error = new Error("Password must be at least 3 characters long");
        error.name = "ValidationError";
        throw error;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, name, passwordHash });
    return newUser;
};

export const getTokenFrom = (request: Request): string | undefined => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return undefined;
};
