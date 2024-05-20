"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = __importDefault(require("../models/blog"));
const blogRouter = (0, express_1.Router)();
blogRouter.get("/api/blogs", (_request, response) => {
    blog_1.default.find({}).then((blogs) => {
        response.json(blogs);
    });
});
blogRouter.post("/api/blogs", (request, response) => {
    const blog = new blog_1.default(request.body);
    blog.save().then((result) => {
        response.status(201).json(result);
    });
});
exports.default = blogRouter;
