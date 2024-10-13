import express from 'express';
import searchByIdMiddleware from '../middleware/searchById_middleware';
import { blogParser } from '../middleware/zodInput_middleware';
import { tokenExtractor } from '../middleware/jwt_md';
import { updateParser } from '../middleware/zod_update_mid';
import blogController from '../controllers/blogController';

//router
const blogRouter = express.Router()

//GET
blogRouter.get('/', 
  blogController.getAllBlogs)

blogRouter.get('/:id', 
  searchByIdMiddleware, 
  blogController.getBlogById)


//POST
blogRouter.post('/', 
  tokenExtractor, 
  blogParser, 
  blogController.createBlog)


//PUT
blogRouter.put('/:id', 
  searchByIdMiddleware, 
  updateParser, 
  blogController.updateBlog)


//DELETE
blogRouter.delete('/:id', 
  tokenExtractor, 
  searchByIdMiddleware, 
  blogController.deleteBlog)

export default blogRouter
