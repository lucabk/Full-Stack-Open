import express from 'express';
import { Request, Response } from 'express';
import { StatusCode } from '../utils/type';
import { Blog } from '../models'; // import from index.ts
import searchByIdMiddleware from '../middleware/searchById_middleware';
import { newBlogEntry } from '../utils/type';
import { blogParser } from '../middleware/zodInput_middleware';

//router
const blogRouter = express.Router()

//GET all
blogRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.status(StatusCode.Ok).json(blogs)
  console.log(JSON.stringify(blogs, null, 2))
})

//GET by id
blogRouter.get('/:id', searchByIdMiddleware, (req, res) => {
  if(req.blog === undefined){
    console.error("404 - Blog not found");
    res.status(StatusCode.NotFound).json({ error: 'blog not found' });
    return;
  }
  res.json(req.blog)
  console.log(req.blog.toJSON())
})


//POST
blogRouter.post('/', blogParser, async (req: Request<unknown, unknown, newBlogEntry>, res: Response<newBlogEntry>) => {
  const blog  = await Blog.create(req.body) // blog includes also other methods and properties of Sequelize
  const blogPlain = blog.get({ plain: true }) as newBlogEntry; // Convert to plain object
  res.status(StatusCode.Created).json(blogPlain);
})

//DELETE
blogRouter.delete('/:id', searchByIdMiddleware, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(StatusCode.NoContent).end()
  }
  else{
    console.error("404 - Blog not found");
    res.status(StatusCode.NotFound).json({ error: 'blog not found' });
  }
})


export default blogRouter
