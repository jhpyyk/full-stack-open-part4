import { test, describe, before } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app";
import User from "../models/user";
import { initialUsersWithPassword } from "./test_helper";
import { LoginInfo } from "../types";

const api = supertest(app);

describe("Login API tests", () => {
    before(async () => {
        await User.deleteMany({});
        await User.insertMany(initialUsersWithPassword);
    });

    test("on valid request: returns username, name and token", async () => {
        const loginInfo: LoginInfo = {
            username: initialUsersWithPassword[0].username,
            password: "password1",
        };
        const response = await api.post("/api/login").send(loginInfo);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.username, loginInfo.username);
        assert.ok(response.body.token);
    });

    test("on invalid request: return error message", async () => {
        const badLoginInfo: LoginInfo = {
            username: "bad",
            password: "bad",
        };
        const response = await api.post("/api/login").send(badLoginInfo);
        assert.strictEqual(response.status, 401);
        assert.strictEqual(response.body.error, "invalid username or password");
    });
});
