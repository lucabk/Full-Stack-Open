import express from 'express';
import searchBlogById from '../middleware/searchById_middleware';
import { blogParser } from '../middleware/zodInput_middleware';
import { updateParser } from '../middleware/zod_update_mid';
import blogController from '../controllers/blogController';
import * as authCOR from '../middleware/auth_middleware'
import { checkBlogToUpdate } from '../middleware/update_blog_middleware';

//router
const blogRouter = express.Router()

//GET
blogRouter.get('/', 
  blogController.getAllBlogs)

blogRouter.get('/:id', 
  searchBlogById, 
  blogController.getBlogById)


//POST
blogRouter.post('/', 
  authCOR.authCOR,
  blogParser, 
  blogController.createBlog)


//PUT
blogRouter.put('/:id', 
  authCOR.authCOR,
  searchBlogById, 
  updateParser,
  checkBlogToUpdate,
  blogController.updateBlog)


//DELETE
blogRouter.delete('/:id', 
  authCOR.authCOR,
  searchBlogById, 
  blogController.deleteBlog)

export default blogRouter
