"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const dummy = (_blogs) => {
    return 1;
};
const totalLikes = (blogs) => {
    const sumOfLikes = (sum, blog) => {
        return sum + blog.likes.valueOf();
    };
    const total = blogs.reduce(sumOfLikes, 0);
    return total;
};
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined;
    }
    const moreLikedBlog = (mostLiked, blog) => {
        if (blog.likes.valueOf() > mostLiked.likes.valueOf()) {
            return blog;
        }
        return mostLiked;
    };
    return blogs.reduce(moreLikedBlog, blogs[0]);
};
const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined;
    }
    const counts = _.countBy(blogs, "author");
    const mostBlogsAuthor = _.maxBy(_.keys(counts), (author) => counts[author]);
    if (!mostBlogsAuthor) {
        return undefined;
    }
    return { author: mostBlogsAuthor, blogs: counts[mostBlogsAuthor] };
};
const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined;
    }
    const countAuthorLikes = (author) => {
        return _.sumBy(author, "likes");
    };
    const grouped = _.groupBy(blogs, "author");
    const likeCounts = _.mapValues(grouped, countAuthorLikes);
    const mostLikesAuthor = _.maxBy(_.keys(likeCounts), (author) => likeCounts[author]);
    if (!mostLikesAuthor) {
        return undefined;
    }
    return { author: mostLikesAuthor, likes: likeCounts[mostLikesAuthor] };
};
exports.default = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
