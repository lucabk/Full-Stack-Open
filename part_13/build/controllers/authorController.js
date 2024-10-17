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
const models_1 = require("../models");
const db_1 = require("../utils/db");
const getAuthors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authors = yield models_1.Blog.findAll({
        attributes: [
            'author',
            [db_1.sequelize.fn('COUNT', db_1.sequelize.col('id')), 'articles'],
            [db_1.sequelize.fn('SUM', db_1.sequelize.col('likes')), 'likes']
        ],
        group: 'author',
        order: [['likes', 'DESC']]
    });
    res.json(authors);
});
exports.default = { getAuthors };
