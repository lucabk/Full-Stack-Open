import express from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'
import { Blog, User } from '../models';
import searchByIdMiddleware from '../middleware/searchById_middleware';
import { newBlogEntry } from '../utils/type';
import { blogParser } from '../middleware/zodInput_middleware';
import { tokenExtractor } from '../middleware/jwt_md';
import { updateParser } from '../middleware/zod_update_mid';
import { newLikeEntry } from '../utils/type';
import { JwtPayload } from 'jsonwebtoken';

//router
const blogRouter = express.Router()

//GET all
blogRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.status(StatusCodes.OK).json(blogs)
})

// by id
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
blogRouter.post('/', tokenExtractor, blogParser, async (req: Request<JwtPayload, unknown, newBlogEntry>, res: Response<newBlogEntry>) => {
  //user's id inside the token
  const jwt: JwtPayload = req.decodedToken as JwtPayload
  if(!jwt.id){
    res.status(401).end()
    return
  }
  const user = await User.findByPk(Number(jwt.id))
  if(user){
    const blog  = await Blog.create({ ...req.body, userId: user.id }) 
    res.status(StatusCodes.CREATED).json(blog);
  }
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
    res.status(StatusCodes.OK).json(blogUpdated);
  }else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }
})


//DELETE
blogRouter.delete('/:id', tokenExtractor, searchByIdMiddleware, async (req:Request, res:Response) => {
  const jwt: JwtPayload = req.decodedToken as JwtPayload
  if(!jwt.id || !req.blog){
    res.status(StatusCodes.UNAUTHORIZED).end()
    return
  }
  //find user with the id binded to JWT
  const user = await User.findByPk(Number(jwt.id))
  //if the user exists and created the blog
  if(user && user.id === req.blog.userId){
    await req.blog.destroy()
    res.status(StatusCodes.NO_CONTENT).end()
  }else{
    res.status(StatusCodes.FORBIDDEN).end()
    return  
  }
})


export default blogRouter
