import express from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'
import { Blog } from '../models';
import searchByIdMiddleware from '../middleware/searchById_middleware';
import { newBlogEntry } from '../utils/type';
import { blogParser } from '../middleware/zodInput_middleware';
import { updateParser } from '../middleware/zod_update_mid';
import { newLikeEntry } from '../utils/type';

//router
const blogRouter = express.Router()

//GET all
blogRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.status(StatusCodes.OK).json(blogs)
  console.table(JSON.stringify(blogs, null, 2))
})

//GET by id
blogRouter.get('/:id', searchByIdMiddleware, (req, res) => {
  if(req.blog === undefined){
    console.error("404 - Blog not found");
    res.status(StatusCodes.NOT_FOUND).json({ error: 'blog not found' });
    return;
  }
  res.json(req.blog)
  console.table(req.blog.toJSON())
})


//POST
blogRouter.post('/', blogParser, async (req: Request<unknown, unknown, newBlogEntry>, res: Response<newBlogEntry>) => {
  const blog  = await Blog.create(req.body) // blog includes also other methods and properties of Sequelize
  const blogPlain = blog.get({ plain: true }) as newBlogEntry; // Convert to plain object
  res.status(StatusCodes.CREATED).json(blogPlain);
})


//PUT
blogRouter.put('/:id', searchByIdMiddleware, updateParser, async(req: Request<{ id: string }, unknown, newLikeEntry>, res: Response<newBlogEntry>) => {
  if(req.blog === undefined){
    console.error("404 - Blog not found");
    res.status(StatusCodes.NOT_FOUND).end()
    return;
  }
  const id:number = Number(req.params.id)
  await Blog.update(req.body, {
    where: {id}
  })
  const blogUpdated = await Blog.findByPk(id)
  if(blogUpdated){
    const blogPlain = blogUpdated.get({ plain: true }) as newBlogEntry; // Convert to plain object
    res.status(StatusCodes.OK).json(blogPlain);
  }else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }

})


//DELETE
blogRouter.delete('/:id', searchByIdMiddleware, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(StatusCodes.NO_CONTENT).end()
  }
  else{
    console.error("404 - Blog not found");
    res.status(StatusCodes.NOT_FOUND).json({ error: 'blog not found' });
  }
})


export default blogRouter
