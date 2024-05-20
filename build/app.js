"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogs_1 = __importDefault(require("./controllers/blogs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(blogs_1.default);
app.use((0, cors_1.default)());
const mongoUrl = config_1.default.MONGODB_URI;
if (!mongoUrl) {
    throw new Error("MONGODB_URI not found");
}
mongoose_1.default.connect(mongoUrl);
exports.default = app;
