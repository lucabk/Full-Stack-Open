import { StatusCodes } from "http-status-codes";
import { Blog, ReadingList, User } from "../models";
import { ErrorMsg, factory } from "../utils/errorFactory";
import { newReadingListEntry, ReadingListQuery } from "../utils/type";
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


//verify is the blog was already added to the reading list
const checkNotInReadingList = async (req:Request<unknown, unknown, newReadingListEntry>, _res:Response, next:NextFunction) => {
    //find reading list associated to the user
    const ReadingListQuery = await ReadingList.findAll({
        include: 
            {
                model: Blog,
                attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
                through: {
                    attributes: []
                }
            },
            where : { userId : req.body.userId }
    }) as unknown as ReadingListQuery[] //Copilot hint

    const blogAlreadyAdded = ReadingListQuery.find(r => r.blogs[0].id === req.body.blogId)
    if(blogAlreadyAdded){
        const err:ErrorMsg = factory.getError(StatusCodes.BAD_REQUEST, 'blog already added to reading list')
        next(err)
        return
    }
    next()
}

//COR
export const readingListCOR = [
    readingListParser,
    checkUserId,
    checkBlogId,
    checkNotInReadingList
]