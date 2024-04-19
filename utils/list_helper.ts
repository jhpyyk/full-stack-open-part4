import { BlogType, AuthorType } from "../types";
import * as _ from "lodash";

const dummy = (_blogs: BlogType[]) => {
    return 1;
};

const totalLikes = (blogs: BlogType[]): number => {
    const sumOfLikes = (sum: number, blog: BlogType) => {
        return sum + blog.likes.valueOf();
    };
    const total = blogs.reduce(sumOfLikes, 0);
    return total;
};

const favoriteBlog = (blogs: BlogType[]): BlogType | undefined => {
    if (blogs.length === 0) {
        return undefined;
    }
    const moreLikedBlog = (mostLiked: BlogType, blog: BlogType): BlogType => {
        if (blog.likes.valueOf() > mostLiked.likes.valueOf()) {
            return blog;
        }
        return mostLiked;
    };
    return blogs.reduce(moreLikedBlog, blogs[0]);
};

const mostBlogs = (blogs: BlogType[]): AuthorType | undefined => {
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

export default {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};
