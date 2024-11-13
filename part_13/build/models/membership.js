"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class Membership extends sequelize_1.Model {
}
Membership.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    readingListId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'readingLists',
            key: 'id'
        }
    },
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'blogs',
            key: 'id'
        }
    }
}, {
    sequelize: db_1.sequelize,
    tableName: 'memberships',
    timestamps: true,
    modelName: 'membership'
});
exports.default = Membership;
