import express from "express"
import { newLikeEntry } from "../utils/type"
import { ErrorMsg, factory } from "../utils/errorFactory"
import { StatusCodes } from "http-status-codes"

export const checkBlogToUpdate = (req: express.Request<unknown, unknown, newLikeEntry>, _res: express.Response, next: express.NextFunction) => {
    console.log('checkBlogToUpdate')
    if (req.body.user !== req.blog?.userId || req.body.author !== req.blog.author || req.body.title !== req.blog.title || req.body.url !== req.blog.url){
        const err:ErrorMsg = factory.getError(StatusCodes.BAD_REQUEST, 'wrong blog info')
        next(err)
        return
    }
    next()
}

export const checkOwnerOfBlog = (req: express.Request<unknown, unknown, newLikeEntry>, _res: express.Response, next: express.NextFunction) => {
    console.log('checkOwnerOfBlog')
    if (req.body.user !== req.blog?.userId || req.user.id !== req.blog?.userId){
        const err:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'not the user of the blog')
        next(err)
        return
    }
    next()
}