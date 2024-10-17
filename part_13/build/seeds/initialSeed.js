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
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        const users = yield queryInterface.sequelize.query(`SELECT id FROM users WHERE username = 'user1@example.com' OR username = 'user2@example.com';`);
        if (users[0].length === 0) {
            yield queryInterface.bulkInsert('users', [
                {
                    username: 'user1@example.com',
                    name: 'User One',
                    password: yield bcrypt_1.default.hash('password1', 10),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'user2@example.com',
                    name: 'User Two',
                    password: yield bcrypt_1.default.hash('password2', 10),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
        const blogs = yield queryInterface.sequelize.query(`SELECT id FROM blogs WHERE title = 'Blog One' OR title= 'Blog Two';`);
        if (blogs[0].length === 0) {
            yield queryInterface.bulkInsert('blogs', [
                {
                    author: 'Author One',
                    url: 'http://example.com/blog1',
                    title: 'Blog One',
                    likes: 10,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    author: 'Author Two',
                    url: 'http://example.com/blog2',
                    title: 'Blog Two',
                    likes: 20,
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.bulkDelete('blogs', {}, {});
        yield queryInterface.bulkDelete('users', {}, {});
    }),
};
