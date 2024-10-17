"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zodInput_middleware_1 = require("../middleware/zodInput_middleware");
const userController_1 = __importDefault(require("../controllers/userController"));
const userRouter = express_1.default.Router();
//GET 
userRouter.get('/', userController_1.default.getAllUsers);
userRouter.get('/:id', userController_1.default.getUser);
//POST
userRouter.post('/', zodInput_middleware_1.userParser, userController_1.default.createUser);
//PUT
userRouter.put('/:username', zodInput_middleware_1.userUpdateParser, userController_1.default.updateUser);
exports.default = userRouter;
