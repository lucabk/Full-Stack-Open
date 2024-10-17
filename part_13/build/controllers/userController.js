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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.findAll({
        include: {
            model: models_1.Blog,
            attributes: { exclude: ['userId'] }
        }
    });
    res.json(users);
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const user = yield models_1.User.findByPk(id);
    if (!user) {
        console.error("404 - user not found");
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: 'user not found' });
        return;
    }
    res.json(user);
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password } = req.body;
    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    //new user
    const newUserEntry = { name, username, password: hashedPassword };
    const user = yield models_1.User.create(newUserEntry);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(user);
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldUsername = String(req.params.username);
    const { username } = req.body; //TODO: check password
    //find user by username
    const userToUpdate = yield models_1.User.findOne({ where: { username: oldUsername } });
    if (!userToUpdate) {
        console.error('user not found');
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).end();
        return;
    }
    //update the username
    yield models_1.User.update({ username }, {
        where: { username: oldUsername }
    });
    //find the updated user
    const updatedUser = yield models_1.User.findOne({ where: { username } });
    if (!updatedUser) {
        console.error('Error retrieving updated user');
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).end();
        return;
    }
    //send updated user
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser);
});
exports.default = {
    getAllUsers,
    getUser,
    createUser,
    updateUser
};
