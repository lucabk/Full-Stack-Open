import express from 'express';
import searchByIdMiddleware from '../middleware/searchById_middleware';
import { blogParser } from '../middleware/zodInput_middleware';
import { updateParser } from '../middleware/zod_update_mid';
import blogController from '../controllers/blogController';
import * as authCOR from '../middleware/auth_middleware'


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
  authCOR.authCOR,
  blogParser, 
  blogController.createBlog)


//PUT
blogRouter.put('/:id', 
  searchByIdMiddleware, 
  updateParser, 
  blogController.updateBlog)


//DELETE
blogRouter.delete('/:id', 
  authCOR.authCOR,
  searchByIdMiddleware, 
  blogController.deleteBlog)

export default blogRouter
