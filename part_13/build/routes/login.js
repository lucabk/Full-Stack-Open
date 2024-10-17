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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const express_1 = __importDefault(require("express"));
const zodInput_middleware_1 = require("../middleware/zodInput_middleware");
const config_1 = require("../utils/config");
const http_status_codes_1 = require("http-status-codes");
const loginRouter = express_1.default.Router();
loginRouter.post('/', zodInput_middleware_1.userUpdateParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userToAuthenticate = yield models_1.User.findOne({ where: { username } });
    //If the user is found, the code compares the provided password with the stored password hash
    const passwordCorrect = userToAuthenticate === null ?
        false :
        yield bcrypt_1.default.compare(password, (userToAuthenticate.password));
    //If the user is not found or the password is incorrect
    if (!userToAuthenticate || !passwordCorrect) {
        console.error('user not found or incorrect password');
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).end();
        return;
    }
    //If the credentials are valid, the code creates a token payload (userForToken) containing the username and id
    const userForToken = {
        username: username,
        id: userToAuthenticate.id
    };
    /*The token is then signed using a secret key from the environment variables and expires in one hour
    Once the token expires, the client app needs to get a new token. Usually, this happens by forcing the user to re-login to the app*/
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.KEY //,{ expiresIn: 60*60 }
    );
    res.send({ token, username });
    console.log('TOKEN sent');
}));
exports.default = loginRouter;
