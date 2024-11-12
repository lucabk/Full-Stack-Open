"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookStatus = exports.newUsernameSchema = exports.newUserSchema = exports.newLikeSchema = exports.newEntrySchema = void 0;
const zod_1 = require("zod");
//ZOD for Blog POST validation
exports.newEntrySchema = zod_1.z.object({
    author: zod_1.z.string().min(1).max(255).optional(),
    url: zod_1.z.string().url(),
    title: zod_1.z.string().min(1).max(255),
    likes: zod_1.z.number().int().nonnegative().default(0),
    year: zod_1.z.number().int().min(1991).max(new Date().getFullYear()).optional()
});
//ZOD for Blog PUT validation
exports.newLikeSchema = zod_1.z.object({
    likes: zod_1.z.number().int().nonnegative()
});
//ZOD for User POST validation
exports.newUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    username: zod_1.z.string().min(1).max(255),
    password: zod_1.z.string().min(8).max(255)
});
//ZOD for User PUT validation (and for Login POST validation)
exports.newUsernameSchema = zod_1.z.object({
    username: zod_1.z.string().min(1).max(255),
    password: zod_1.z.string().min(8).max(255)
});
//reading list status
var bookStatus;
(function (bookStatus) {
    bookStatus["READ"] = "read";
    bookStatus["UNREAD"] = "unread";
})(bookStatus || (exports.bookStatus = bookStatus = {}));
