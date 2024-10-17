"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const http_status_codes_1 = require("http-status-codes");
const tokenExtractor = (req, res, next) => {
    //The function retrieves the value of the Authorization header from the request object using the get method
    const authorization = req.get('authorization');
    //The function checks if the authorization header exists and if it starts with the string 'Bearer '
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            //The function jwt.verify decodes the token
            req.decodedToken = jsonwebtoken_1.default.verify(authorization.substring(7), config_1.KEY); //types/express/index.d.ts
        }
        catch (_a) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: 'token invalid' });
            return;
        }
        //If the authorization header is not present or does not start with 'Bearer ' -> token missing
    }
    else {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: 'token missing' });
        return;
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
