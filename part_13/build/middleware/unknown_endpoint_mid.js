"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = void 0;
const http_status_codes_1 = require("http-status-codes");
//This middleware will be used for catching requests made to non-existent routes
const unknownEndpoint = (_req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ error: 'unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
