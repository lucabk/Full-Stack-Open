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
const sequelize_1 = require("sequelize");
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.createTable('blogs', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            author: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            url: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            likes: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
        yield queryInterface.createTable('users', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
        yield queryInterface.addColumn('blogs', 'userId', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('blogs');
        yield queryInterface.dropTable('users');
    }),
};
