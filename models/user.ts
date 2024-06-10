import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, minLength: 3, required: true },
    name: { type: String, minLength: 3, required: true, unique: true },
    passwordHash: { type: String, required: true },
});

userSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model("User", userSchema);

export default User;
