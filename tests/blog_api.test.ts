import { test, after, beforeEach, describe } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Blog from "../models/blog";
import assert from "node:assert";
import { BlogType } from "../types";
import { initialBlogs } from "./test_helper";

const api = supertest(app);

describe("Blog API tests", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(initialBlogs);
    });

    test("Blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("There are three blogs", async () => {
        const response = await api.get("/api/blogs");

        assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("The blogs have correct values", async () => {
        const response = await api.get("/api/blogs");
        response.body.forEach((blog: BlogType & { id?: string }) => {
            delete blog.id;
        });
        assert.deepStrictEqual(response.body, initialBlogs);
    });

    test("The blogs have IDs", async () => {
        const response = await api.get("/api/blogs");
        response.body.forEach((blog: BlogType & { id: string }) => {
            assert(blog.id);
        });
    });

    test("A valid blog can be added ", async () => {
        const newBlog: BlogType = {
            title: "test_title_add",
            author: "test_author_add",
            url: "test_url_add",
            likes: 1,
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/blogs");

        const titles = response.body.map((blog: BlogType) => blog.title);

        assert.strictEqual(response.body.length, initialBlogs.length + 1);

        assert(titles.includes("test_title_add"));
    });

    test("Default value for likes is 0", async () => {
        const blogNoLikes: BlogType = {
            title: "test_title_likes_0",
            author: "test_author_likes_0",
            url: "test_url_likes_0",
        };
        await api
            .post("/api/blogs")
            .send(blogNoLikes)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body[response.body.length - 1].likes, 0);
    });

    test("Blogs can be removed", async () => {
        const blogsInitial = await api.get("/api/blogs");
        const idOfFirst = blogsInitial.body[0].id;

        await api.delete(`/api/blogs/${idOfFirst}`);
        const blogsAfter = await api.get("/api/blogs");
        assert.deepStrictEqual(blogsInitial.body.slice(1), blogsAfter.body);
    });

    test("Blogs can be modified", async () => {
        const blogsInitial = await api.get("/api/blogs");
        const idOfFirst = blogsInitial.body[0].id;

        const expectedBlog = {
            ...blogsInitial.body[0],
            title: "new_title",
            likes: blogsInitial.body[0].likes + 1,
        };

        const modifiedBlog = await api
            .patch(`/api/blogs/${idOfFirst}`)
            .send({
                title: "new_title",
                likes: blogsInitial.body[0].likes + 1,
            });

        assert.deepStrictEqual(modifiedBlog.body, expectedBlog);
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
