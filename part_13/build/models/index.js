"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Blog = void 0;
const blogs_1 = __importDefault(require("./blogs"));
exports.Blog = blogs_1.default;
const users_1 = __importDefault(require("./users"));
exports.User = users_1.default;
//One-To-Many relationships
users_1.default.hasMany(blogs_1.default);
blogs_1.default.belongsTo(users_1.default);
