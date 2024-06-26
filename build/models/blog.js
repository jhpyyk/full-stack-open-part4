"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});
const Blog = mongoose_1.default.model("Blog", blogSchema);
exports.default = Blog;
