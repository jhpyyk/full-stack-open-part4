import User from "../models/user";
import bcrypt from "bcrypt";

const createUser = async (username: string, name: string, password: string) => {
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

export default createUser;
