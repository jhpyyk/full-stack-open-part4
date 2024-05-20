"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
exports.default = { PORT, MONGODB_URI };
