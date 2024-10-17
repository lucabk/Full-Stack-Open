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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const config_1 = require("./utils/config");
const db_1 = require("./utils/db");
const blog_1 = __importDefault(require("./routes/blog"));
const user_1 = __importDefault(require("./routes/user"));
const login_1 = __importDefault(require("./routes/login"));
const author_1 = __importDefault(require("./routes/author"));
const errors_middleware_1 = require("./middleware/errors_middleware");
const unknown_endpoint_mid_1 = require("./middleware/unknown_endpoint_mid");
const morgan_1 = __importDefault(require("morgan")); //logging with morgan using the custom token
const cors_1 = __importDefault(require("cors"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
morgan_1.default.token('body', (req) => JSON.stringify(req.body));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express_1.default.json());
app.use('/api/authors', author_1.default);
app.use('/api/blogs', blog_1.default);
app.use('/api/users', user_1.default);
app.use('/api/login', login_1.default); //send token after sucessfully login
app.use(unknown_endpoint_mid_1.unknownEndpoint);
app.use(errors_middleware_1.errorMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDatabase)();
    app.listen(config_1.PORT, () => {
        console.log(`Server running on port ${config_1.PORT}`);
    });
});
start().catch(console.error);
