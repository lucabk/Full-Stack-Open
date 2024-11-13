import { StatusCodes } from "http-status-codes";
import { Blog, User } from "../models";
import { ErrorMsg, factory } from "../utils/errorFactory";
import { newReadingListEntry } from "../utils/type";
import { readingListParser } from "./zodInput_middleware"
import { NextFunction, Request, Response } from 'express';

const checkUserId = async (req:Request<unknown, unknown, newReadingListEntry>, _res:Response, next:NextFunction) => {
    const userOfTheBlog = await User.findByPk(req.body.userId)
    //user not found
    if(!userOfTheBlog){
        const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'user not found')
        next(error)
        return
    }
    next()
}    

const checkBlogId = async (req:Request<unknown, unknown, newReadingListEntry>, _res:Response, next:NextFunction) => {
    const blog = await Blog.findByPk(req.body.blogId)
    //blog not found
    if(!blog){
        const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'blog not found')
        next(error)
        return
    }
    next()
}


////TODO*******************
/*const checkNotInReadingList = async (req:Request, _res:Response, next:NextFunction) => {
    //verify is the blog was already added to the reading list
    const blogAdded = await Model.findOne(
        { 
            where:
                { }
        }
    )
    next()
}*/

//COR
export const readingListCOR = [
    readingListParser,
    checkUserId,
    checkBlogId,
    //checkNotInReadingList
]