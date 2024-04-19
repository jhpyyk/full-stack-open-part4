import { BlogType } from "../types";

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
    const mostLikedBlog = (mostLiked: BlogType, blog: BlogType): BlogType => {
        if (blog.likes.valueOf() > mostLiked.likes.valueOf()) {
            return blog;
        }
        return mostLiked;
    };
    return blogs.reduce(mostLikedBlog, blogs[0]);
};

export default {
    dummy,
    totalLikes,
    favoriteBlog,
};
