import { describe, test } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper";
import { AuthorType, BlogType } from "../types";

test("dummy returns one", () => {
    const blogs: BlogType[] = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
});

describe("total likes", () => {
    test("of an empty list is 0", () => {
        assert.strictEqual(listHelper.totalLikes([]), 0);
    });
    test("of a list of length 1", () => {
        const blog: BlogType = {
            title: "a",
            author: "a",
            url: "a",
            likes: 10,
        };
        assert.strictEqual(listHelper.totalLikes([blog]), blog.likes);
    });
    test("of a list of length 3", () => {
        const blog1: BlogType = {
            title: "a",
            author: "a",
            url: "a",
            likes: 1,
        };
        const blog2: BlogType = {
            title: "a",
            author: "a",
            url: "a",
            likes: 2,
        };
        const blog3: BlogType = {
            title: "a",
            author: "a",
            url: "a",
            likes: 3,
        };
        assert.strictEqual(listHelper.totalLikes([blog1, blog2, blog3]), 6);
    });
});

describe("favorite blog based on likes", () => {
    const blog1: BlogType = {
        title: "a",
        author: "a",
        url: "a",
        likes: 1,
    };
    const blog2: BlogType = {
        title: "b",
        author: "b",
        url: "b",
        likes: 2,
    };
    const blog3: BlogType = {
        title: "c",
        author: "c",
        url: "c",
        likes: 3,
    };
    test("of an empty list is undefined", () => {
        assert.strictEqual(listHelper.favoriteBlog([]), undefined);
    });
    test("of a list of length 1", () => {
        assert.strictEqual(listHelper.favoriteBlog([blog1]), blog1);
    });
    test("of a list of length 3", () => {
        assert.strictEqual(
            listHelper.favoriteBlog([blog1, blog3, blog2]),
            blog3
        );
    });
});

describe("author with the most blogs", () => {
    const blog1: BlogType = {
        title: "a",
        author: "a",
        url: "a",
        likes: 1,
    };
    const blog2: BlogType = {
        title: "b",
        author: "b",
        url: "b",
        likes: 2,
    };
    const blog3: BlogType = {
        title: "c",
        author: "c",
        url: "c",
        likes: 3,
    };
    const blog4: BlogType = {
        title: "b",
        author: "b",
        url: "b",
        likes: 4,
    };
    test("of an empty list is undefined", () => {
        assert.deepStrictEqual(listHelper.mostBlogs([]), undefined);
    });
    test("of a list of length 1", () => {
        const expected: AuthorType = { author: "a", blogs: 1 };
        assert.deepStrictEqual(listHelper.mostBlogs([blog1]), expected);
    });
    test("of a list of length 4", () => {
        const expected: AuthorType = { author: "b", blogs: 2 };
        assert.deepStrictEqual(
            listHelper.mostBlogs([blog1, blog2, blog3, blog4]),
            expected
        );
    });
});
