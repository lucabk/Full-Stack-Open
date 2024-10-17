"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const zod_1 = require("zod");
const errorMiddleware = (error, _req, res, next) => {
    console.error('errorMiddleware:', error);
    // Factory error handling
    if (error.msg && error.statusCode) {
        const err = error;
        res.status(err.statusCode).json({ error: err.msg });
        return;
    }
    //Sequelize error handling
    if (error instanceof sequelize_1.ValidationError) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: error.errors[0].message });
        return; //return before calling Express error handler with next(error), avoiding console errors output
    }
    //Zod error handling
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
        return;
    }
    next(error);
};
exports.errorMiddleware = errorMiddleware;
