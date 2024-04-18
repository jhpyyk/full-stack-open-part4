import { Router } from "express";
import Blog from "../models/blog";

const blogRouter = Router();

blogRouter.get("/api/blogs", (_request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

blogRouter.post("/api/blogs", (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
        response.status(201).json(result);
    });
});

export default blogRouter;
