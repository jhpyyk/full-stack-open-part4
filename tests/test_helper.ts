import { UserType } from "../types";

export const initialBlogs = [
    {
        title: "test_title1",
        author: "test_author1",
        url: "test_url1",
        likes: 1,
    },
    {
        title: "test_title2",
        author: "test_author1",
        url: "test_url1",
        likes: 2,
    },
    {
        title: "test_title3",
        author: "test_author2",
        url: "test_url2",
        likes: 3,
    },
];

export const initialUsers: UserType[] = [
    {
        username: "username1",
        name: "name1",
    },
    {
        username: "username2",
        name: "name2",
    },
    {
        username: "username3",
        name: "name3",
    },
];

export const initialUsersWithPassword: Array<
    UserType & { passwordHash: string }
> = [
    {
        ...initialUsers[0],
        passwordHash:
            "$2b$10$xu9HYpQtwKDgDA5bO0CUY.Tp6hxEtmx174xJWNBfqUvDCZUvylrPC", //password1
    },
    {
        ...initialUsers[1],
        passwordHash:
            "$2b$10$Z9MIogD0KvpSXumhc/W3WuHdDfSI6eOLysXlaVyfOkwBguLmDL76m", //password2
    },
    {
        ...initialUsers[2],
        passwordHash:
            "$2b$10$yCcRjZxjkWkz10Wp.hmdi.o5m1vridzYyzj1TCOwyOq5qc8ktn5vO", //password3
    },
];
