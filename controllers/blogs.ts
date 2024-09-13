import { Router } from "express";
import Blog from "../models/blog";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { getTokenFrom } from "../utils/helper_functions";

interface UserPayload {
    id: string;
}

const blogRouter = Router();

blogRouter.get("/api/blogs", async (_request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: true,
        name: true,
        id: true,
    });
    return response.status(200).json(blogs);
});

blogRouter.get("/api/blogs/:id", async (request, response) => {
    const blog = await Blog.find({ _id: request.params.id });
    response.json(blog);
});

blogRouter.post("/api/blogs", async (request, response) => {
    const token = getTokenFrom(request);
    if (!token) {
        return response
            .status(401)
            .json({ error: "invalid authorization header" });
    }
    if (!process.env.SECRET) {
        return response.status(500).json({ error: "missing secret in env" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET) as UserPayload;
    if (!decodedToken.id) {
        return response.status(401).json({ error: "invalid token" });
    }
    const user = await User.findById(decodedToken.id);
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
    await user.save();
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
