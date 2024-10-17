"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.factory = void 0;
const http_status_codes_1 = require("http-status-codes");
class GenericError {
    constructor(msg, statusCode) {
        this._msg = msg;
        this._statusCode = statusCode;
    }
    get statusCode() {
        return this._statusCode;
    }
    get msg() {
        return this._msg;
    }
}
class UnauthorizedError extends GenericError {
} //401
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends GenericError {
}
class NotFoundError extends GenericError {
} //404
class InternalServerError extends GenericError {
} //500
class ErrorFactory {
    constructor() { }
    getError(code, msg) {
        let retval;
        switch (code) {
            case http_status_codes_1.StatusCodes.NOT_FOUND:
                retval = new NotFoundError(msg, code);
                break;
            case http_status_codes_1.StatusCodes.UNAUTHORIZED:
                retval = new UnauthorizedError(msg, code);
                break;
            case http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR:
                retval = new InternalServerError(msg, code);
                break;
            case http_status_codes_1.StatusCodes.FORBIDDEN:
                retval = new ForbiddenError(msg, code);
                break;
            default:
                throw new Error(`Factory Error: Unhandled status code: ${code}`);
        }
        return retval;
    }
}
const factory = new ErrorFactory();
exports.factory = factory;
