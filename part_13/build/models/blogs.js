"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
// Model definition
class Blog extends sequelize_1.Model {
}
Blog.init({
    //Model attributes
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: sequelize_1.DataTypes.STRING, // VARCHAR(255)
        allowNull: true
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize: db_1.sequelize, // We need to pass the connection instance
    tableName: 'blogs', //explicit table name inference
    timestamps: true, // not have to use the timestamps columns (created_at and updated_at)
    modelName: 'blog', // We need to choose the model name
});
exports.default = Blog;
