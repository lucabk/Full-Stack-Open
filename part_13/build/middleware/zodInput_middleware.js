"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateParser = exports.userParser = exports.blogParser = void 0;
const type_1 = require("../utils/type");
const blogParser = (req, _res, next) => {
    console.log("blogParser");
    try {
        type_1.newEntrySchema.parse(req.body);
    }
    catch (err) {
        next(err);
    }
    next();
};
exports.blogParser = blogParser;
const userParser = (req, _res, next) => {
    console.log('userParser');
    try {
        type_1.newUserSchema.parse(req.body);
    }
    catch (err) {
        next(err);
    }
    next();
};
exports.userParser = userParser;
const userUpdateParser = (req, _res, next) => {
    console.log('userUpdateParser');
    try {
        type_1.newUsernameSchema.parse(req.body);
    }
    catch (err) {
        next(err);
    }
    next();
};
exports.userUpdateParser = userUpdateParser;
