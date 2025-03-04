import { Blog } from "../models"
import express from "express"
import { ErrorMsg, factory } from "../utils/errorFactory"
import { StatusCodes } from "http-status-codes"

const searchBlogById = async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    const id:number = Number(req.params.id)
    const blog = await Blog.findByPk(id)
    if (!blog){
        const err:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'blog not found')
        next(err)
        return
    }
    req.blog = blog 
    next()
}

export default searchBlogById