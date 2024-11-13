"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
const type_1 = require("../utils/type");
class ReadingList extends sequelize_1.Model {
}
ReadingList.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: type_1.bookStatus.UNREAD
    }
}, {
    sequelize: db_1.sequelize,
    tableName: 'readingLists',
    timestamps: true,
    modelName: "readingList"
});
exports.default = ReadingList;
