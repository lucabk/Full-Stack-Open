"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY = exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = require("dotenv");
// Load environment variables from .env file into process.env
(0, dotenv_1.config)();
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = Number(process.env.PORT) || 3001;
exports.KEY = String(process.env.KEY);
