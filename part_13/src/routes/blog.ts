import express from 'express';
import { StatusCode } from '../utils/type';
import { Blog } from '../models'; // import from index.ts
import searchByIdMiddleware from '../middleware/searchById_middleware';
const blogRouter = express.Router()

//GET
blogRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.status(StatusCode.Ok).json(blogs)
  console.log(JSON.stringify(blogs, null, 2))
})
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
blogRouter.post('/', async (req, res) => {
  console.log(req.body)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const blog = await Blog.create(req.body)
  res.status(StatusCode.Created).json(blog)
})

//DELETE
blogRouter.delete('/:id', async (req, res) => {
  const id:number = Number(req.params.id)
  try{
    const result = await Blog.destroy({
      where: {id}
    })
    if(result===0){
      res.status(StatusCode.NotFound).json({ error: 'Blog not found' });
    } else {
      res.status(StatusCode.NoContent).end();
    }
  }catch(error){
    console.error(error)
    res.status(StatusCode.InternalServerError).json({ error: 'Something went wrong' });
  }
})

export default blogRouter
