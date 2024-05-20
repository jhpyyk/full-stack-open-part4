import { Router } from "express";
import Blog from "../models/blog";

const blogRouter = Router();

blogRouter.get("/api/blogs", async (_request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.post("/api/blogs", async (request, response) => {
    const blog = new Blog(request.body);

    await blog.save();
    response.status(201).json(blog);
});

export default blogRouter;
