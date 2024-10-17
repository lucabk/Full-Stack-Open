"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchById_middleware_1 = __importDefault(require("../middleware/searchById_middleware"));
const zodInput_middleware_1 = require("../middleware/zodInput_middleware");
const jwt_md_1 = require("../middleware/jwt_md");
const zod_update_mid_1 = require("../middleware/zod_update_mid");
const blogController_1 = __importDefault(require("../controllers/blogController"));
//router
const blogRouter = express_1.default.Router();
//GET
blogRouter.get('/', blogController_1.default.getAllBlogs);
blogRouter.get('/:id', searchById_middleware_1.default, blogController_1.default.getBlogById);
//POST
blogRouter.post('/', jwt_md_1.tokenExtractor, zodInput_middleware_1.blogParser, blogController_1.default.createBlog);
//PUT
blogRouter.put('/:id', searchById_middleware_1.default, zod_update_mid_1.updateParser, blogController_1.default.updateBlog);
//DELETE
blogRouter.delete('/:id', jwt_md_1.tokenExtractor, searchById_middleware_1.default, blogController_1.default.deleteBlog);
exports.default = blogRouter;
