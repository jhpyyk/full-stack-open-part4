"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const list_helper_1 = __importDefault(require("../utils/list_helper"));
(0, node_test_1.test)("dummy returns one", () => {
    const blogs = [];
    const result = list_helper_1.default.dummy(blogs);
    node_assert_1.default.strictEqual(result, 1);
});
(0, node_test_1.describe)("total likes", () => {
    (0, node_test_1.test)("of an empty list is 0", () => {
        node_assert_1.default.strictEqual(list_helper_1.default.totalLikes([]), 0);
    });
    (0, node_test_1.test)("of a list of length 1", () => {
        const blog = {
            title: "a",
            author: "a",
            url: "a",
            likes: 10,
        };
        node_assert_1.default.strictEqual(list_helper_1.default.totalLikes([blog]), blog.likes);
    });
    (0, node_test_1.test)("of a list of length 3", () => {
        const blog1 = {
            title: "a",
            author: "a",
            url: "a",
            likes: 1,
        };
        const blog2 = {
            title: "a",
            author: "a",
            url: "a",
            likes: 2,
        };
        const blog3 = {
            title: "a",
            author: "a",
            url: "a",
            likes: 3,
        };
        node_assert_1.default.strictEqual(list_helper_1.default.totalLikes([blog1, blog2, blog3]), 6);
    });
});
(0, node_test_1.describe)("favorite blog based on likes", () => {
    const blog1 = {
        title: "a",
        author: "a",
        url: "a",
        likes: 1,
    };
    const blog2 = {
        title: "b",
        author: "b",
        url: "b",
        likes: 2,
    };
    const blog3 = {
        title: "c",
        author: "c",
        url: "c",
        likes: 3,
    };
    (0, node_test_1.test)("of an empty list is undefined", () => {
        node_assert_1.default.strictEqual(list_helper_1.default.favoriteBlog([]), undefined);
    });
    (0, node_test_1.test)("of a list of length 1", () => {
        node_assert_1.default.strictEqual(list_helper_1.default.favoriteBlog([blog1]), blog1);
    });
    (0, node_test_1.test)("of a list of length 3", () => {
        node_assert_1.default.strictEqual(list_helper_1.default.favoriteBlog([blog1, blog3, blog2]), blog3);
    });
});
(0, node_test_1.describe)("author with the most blogs", () => {
    const blog1 = {
        title: "a",
        author: "a",
        url: "a",
        likes: 1,
    };
    const blog2 = {
        title: "b",
        author: "b",
        url: "b",
        likes: 2,
    };
    const blog3 = {
        title: "c",
        author: "c",
        url: "c",
        likes: 3,
    };
    const blog4 = {
        title: "b",
        author: "b",
        url: "b",
        likes: 4,
    };
    (0, node_test_1.test)("in an empty list is undefined", () => {
        node_assert_1.default.deepStrictEqual(list_helper_1.default.mostBlogs([]), undefined);
    });
    (0, node_test_1.test)("in a list of length 1", () => {
        const expected = { author: "a", blogs: 1 };
        node_assert_1.default.deepStrictEqual(list_helper_1.default.mostBlogs([blog1]), expected);
    });
    (0, node_test_1.test)("in a list of length 4", () => {
        const expected = { author: "b", blogs: 2 };
        node_assert_1.default.deepStrictEqual(list_helper_1.default.mostBlogs([blog1, blog2, blog3, blog4]), expected);
    });
});
(0, node_test_1.describe)("author with the most likes", () => {
    const blog1 = {
        title: "a",
        author: "a",
        url: "a",
        likes: 1,
    };
    const blog2 = {
        title: "b",
        author: "b",
        url: "b",
        likes: 2,
    };
    const blog3 = {
        title: "c",
        author: "c",
        url: "c",
        likes: 3,
    };
    const blog4 = {
        title: "b",
        author: "b",
        url: "b",
        likes: 4,
    };
    (0, node_test_1.test)("in an empty list is undefined", () => {
        node_assert_1.default.deepStrictEqual(list_helper_1.default.mostLikes([]), undefined);
    });
    (0, node_test_1.test)("in a list of length 1", () => {
        const expected = { author: "a", likes: 1 };
        node_assert_1.default.deepStrictEqual(list_helper_1.default.mostLikes([blog1]), expected);
    });
    (0, node_test_1.test)("in a list of length 4", () => {
        const expected = { author: "b", likes: 6 };
        node_assert_1.default.deepStrictEqual(list_helper_1.default.mostLikes([blog1, blog2, blog3, blog4]), expected);
    });
});
