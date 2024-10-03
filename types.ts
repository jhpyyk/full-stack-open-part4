import { Types } from "mongoose";

export type BlogType = {
    title: String;
    author: String;
    url: String;
    likes?: Number;
};

export type AuthorWithBlogs = {
    author: String;
    blogs: number;
};

export type AuthorWithLikes = {
    author: String;
    likes: number;
};

export type UserType = {
    username: string;
    name: string;
};

export type LoginInfo = {
    username: string;
    password: string;
};

export type AuthorizedUser = {
    username: string;
    name: string;
    id: Types.ObjectId;
    token: string;
};
