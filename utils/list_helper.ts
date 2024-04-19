import { log } from "console";
import { BlogType, AuthorWithBlogs, AuthorWithLikes } from "../types";
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

const mostBlogs = (blogs: BlogType[]): AuthorWithBlogs | undefined => {
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

const mostLikes = (blogs: BlogType[]): AuthorWithLikes | undefined => {
    if (blogs.length === 0) {
        return undefined;
    }
    const countAuthorLikes = (author: BlogType[]): number => {
        return _.sumBy(author, "likes");
    };
    const grouped = _.groupBy(blogs, "author");
    const likeCounts = _.mapValues(grouped, countAuthorLikes);
    const mostLikesAuthor = _.maxBy(
        _.keys(likeCounts),
        (author) => likeCounts[author]
    );
    if (!mostLikesAuthor) {
        return undefined;
    }
    return { author: mostLikesAuthor, likes: likeCounts[mostLikesAuthor] };
};

export default {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
