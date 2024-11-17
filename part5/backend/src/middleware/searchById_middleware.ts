import { Blog } from "../models"
import express from "express"

const searchByIdMiddleware = async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    const id:number = Number(req.params.id)
    const blog = await Blog.findByPk(id)
    req.blog = blog !== null ? blog : undefined
    next()
}

export default searchByIdMiddleware