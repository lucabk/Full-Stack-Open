import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'
import { Blog, User } from '../models';
import { newBlogEntry } from '../utils/type';
import { newLikeEntry } from '../utils/type';
import { JwtPayload } from 'jsonwebtoken';
import { Op, WhereOptions } from 'sequelize';
import { factory, ErrorMsg } from '../utils/errorFactory';


const getAllBlogs = async (req:Request, res:Response<Blog[]>) => {
  
    const where:WhereOptions = {} //query WHERE
    if (req.query.search){
      where.title =  { [Op.iLike]: `%${String(req.query.search)}%` }
      where.author = { [Op.iLike]: `%${String(req.query.search)}%` }
    }
  
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      },
      where,
      order:[ ['likes', 'DESC']]
    })
    res.status(StatusCodes.OK).json(blogs)
  }

const getBlogById = (req:Request, res:Response< Blog >, next:NextFunction) => {
    if(req.blog === undefined){
      const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'blog not found')
      next(error)
      return;
    }
    res.json(req.blog)
    console.table(req.blog.toJSON())
}

const createBlog = async (req: Request<JwtPayload, unknown, newBlogEntry>, res: Response<newBlogEntry>, next:NextFunction) => {
    //user's id inside the token
    const jwt: JwtPayload = req.decodedToken as JwtPayload
    if(!jwt.id){
      const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'missign jwt id')
      next(error)
      return
    }
    const user = await User.findByPk(Number(jwt.id))
    if(user){
      const blog  = await Blog.create({ ...req.body, userId: user.id }) 
      res.status(StatusCodes.CREATED).json(blog);
    }
} 

const updateBlog = async(req: Request<{ id: string }, unknown, newLikeEntry>, res: Response<newBlogEntry>, next:NextFunction) => {
    if(req.blog === undefined){
      const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'Blog not found')
      next(error)
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
      const error:ErrorMsg = factory.getError(StatusCodes.INTERNAL_SERVER_ERROR, 'Server Error')
      next(error)
    }
}

const deleteBlog = async (req:Request, res:Response, next:NextFunction) => {
    const jwt: JwtPayload = req.decodedToken as JwtPayload
    if(!jwt.id || !req.blog){
      const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'jtw.id or blog missing')
      next(error)
      return
    }
    //find user with the id binded to JWT
    const user = await User.findByPk(Number(jwt.id))
    //if the user exists and created the blog
    if(user && user.id === req.blog.userId){
      await req.blog.destroy()
      res.status(StatusCodes.NO_CONTENT).end()
    }else{
      const error:ErrorMsg = factory.getError(StatusCodes.FORBIDDEN, 'the current user is not the creator of the blog')
      next(error)
      return  
    }
}
  

export default { 
    getAllBlogs,
    getBlogById, 
    createBlog,  
    updateBlog,
    deleteBlog
    }