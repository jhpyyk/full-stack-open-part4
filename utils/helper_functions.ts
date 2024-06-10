import User from "../models/user";
import { UserType } from "../types";
import bcrypt from "bcrypt";

const createUser = async (user: UserType, password: string) => {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ user, passwordHash });
    return newUser;
};

export default createUser;
