"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParser = void 0;
const type_1 = require("../utils/type");
const updateParser = (req, _res, next) => {
    console.log('updateParser');
    try {
        type_1.newLikeSchema.parse(req.body);
    }
    catch (err) {
        next(err);
    }
    next();
};
exports.updateParser = updateParser;
