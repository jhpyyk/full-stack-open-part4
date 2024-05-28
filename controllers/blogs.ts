import { Router } from "express";
import Blog from "../models/blog";

const blogRouter = Router();

blogRouter.get("/api/blogs", async (_request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.get("/api/blogs/:id", async (request, response) => {
    const blog = await Blog.find({ _id: request.params.id });
    response.json(blog);
});

blogRouter.post("/api/blogs", async (request, response) => {
    const blog = new Blog(request.body);

    await blog.save();
    response.status(201).json(blog);
});

blogRouter.delete("/api/blogs/:id", async (request, response) => {
    await Blog.deleteOne({ _id: request.params.id });
    response.status(204).end();
});

blogRouter.patch("/api/blogs/:id", async (request, response) => {
    await Blog.updateOne({ _id: request.params.id }, { ...request.body });
    const blog = await Blog.findOne({ _id: request.params.id });
    response.status(200).send(blog);
});

export default blogRouter;
