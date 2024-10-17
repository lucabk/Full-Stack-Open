"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const errorFactory_1 = require("../utils/errorFactory");
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {}; //query WHERE
    if (req.query.search) {
        where.title = { [sequelize_1.Op.iLike]: `%${String(req.query.search)}%` };
        where.author = { [sequelize_1.Op.iLike]: `%${String(req.query.search)}%` };
    }
    const blogs = yield models_1.Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: models_1.User,
            attributes: ['name']
        },
        where,
        order: [['likes', 'DESC']]
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(blogs);
});
const getBlogById = (req, res, next) => {
    if (req.blog === undefined) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.NOT_FOUND, 'blog not found');
        next(error);
        return;
    }
    res.json(req.blog);
    console.table(req.blog.toJSON());
};
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //user's id inside the token
    const jwt = req.decodedToken;
    if (!jwt.id) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'missign jwt id');
        next(error);
        return;
    }
    const user = yield models_1.User.findByPk(Number(jwt.id));
    if (user) {
        const blog = yield models_1.Blog.create(Object.assign(Object.assign({}, req.body), { userId: user.id }));
        res.status(http_status_codes_1.StatusCodes.CREATED).json(blog);
    }
});
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.blog === undefined) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
        next(error);
        return;
    }
    const id = Number(req.params.id);
    yield models_1.Blog.update(req.body, {
        where: { id }
    });
    const blogUpdated = yield models_1.Blog.findByPk(id);
    if (blogUpdated) {
        res.status(http_status_codes_1.StatusCodes.OK).json(blogUpdated);
    }
    else {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Server Error');
        next(error);
    }
});
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = req.decodedToken;
    if (!jwt.id || !req.blog) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'jtw.id or blog missing');
        next(error);
        return;
    }
    //find user with the id binded to JWT
    const user = yield models_1.User.findByPk(Number(jwt.id));
    //if the user exists and created the blog
    if (user && user.id === req.blog.userId) {
        yield req.blog.destroy();
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).end();
    }
    else {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.FORBIDDEN, 'the current user is not the creator of the blog');
        next(error);
        return;
    }
});
exports.default = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
