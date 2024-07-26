import { Router } from "express";
import Blog from "../models/blog";
import User from "../models/user";

const blogRouter = Router();

blogRouter.get("/api/blogs", async (_request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: true,
        name: true,
        id: true,
    });
    response.json(blogs);
});

blogRouter.get("/api/blogs/:id", async (request, response) => {
    const blog = await Blog.find({ _id: request.params.id });
    response.json(blog);
});

blogRouter.post("/api/blogs", async (request, response) => {
    const user = await User.findOne({});
    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }

    const blog = new Blog({
        ...request.body,
        user: user._id,
    });

    const savedBlog = await blog.save();
    if (!user.blogs) {
        return response.status(404).json({ error: "User has no blogs" });
    }
    user.blogs.push(savedBlog._id);
    const savedUser = await user.save();
    console.log(savedUser);
    return response.status(201).json(blog);
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
