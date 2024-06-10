import { test, after, beforeEach, describe } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import assert from "node:assert";
import { initialUsers, initialUsersWithPassword } from "./test_helper";
import User from "../models/user";
import { UserType } from "../types";

const api = supertest(app);

describe("User API tests", () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await User.insertMany(initialUsersWithPassword);
    });

    test("Users are returned as json", async () => {
        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("There are three users", async () => {
        const response = await api.get("/api/users");

        assert.strictEqual(response.body.length, initialUsers.length);
    });

    test("The users have correct values", async () => {
        const response = await api.get("/api/users");
        response.body.forEach((user: UserType & { id?: string }) => {
            delete user.id;
        });
        assert.deepStrictEqual(response.body, initialUsers);
    });

    test("The users have IDs", async () => {
        const response = await api.get("/api/users");
        response.body.forEach((user: UserType & { id: string }) => {
            assert(user.id);
        });
    });

    test("A valid user can be added ", async () => {
        const newUser: UserType & { password: string } = {
            username: "test_username",
            name: "test_name",
            password: "test_password",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/users");

        const names = response.body.map((user: UserType) => user.name);

        assert.strictEqual(response.body.length, initialUsers.length + 1);

        assert(names.includes("test_name"));
    });

    test("Users can be removed", async () => {
        const usersInitial = await api.get("/api/users");
        const idOfFirst = usersInitial.body[0].id;

        await api.delete(`/api/users/${idOfFirst}`);
        const usersAfter = await api.get("/api/users");
        assert.deepStrictEqual(usersAfter.body, usersInitial.body.slice(1));
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
