import { StatusCodes } from "http-status-codes";
import { Blog, ReadingList, User } from "../models";
import { ErrorMsg, factory } from "../utils/errorFactory";
import { blogStatus, newReadingListEntry, ReadingListQuery } from "../utils/type";
import { readingListParser, updateListParser } from "./zodInput_middleware"
import { NextFunction, Request, Response } from 'express';
import { tokenExtractor } from "./jwt_md";
import { JwtPayload } from "jsonwebtoken";

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

//This middleware checks if the readingList the user is looking for exists
const searchReadingListById = async (req:Request, _res:Response, next:NextFunction) => {
    console.log('searchReadingListById')
    //parse id
    const id = parseInt(req.params.id, 10)
    //console.warn('parseInt:', id)
    if(isNaN(id) || !Number.isInteger(id)){
        const error:ErrorMsg = factory.getError(StatusCodes.BAD_REQUEST, 'Invalid ID format. ID must be a number.')
        next(error)
        return
    }
    //search reding list by id
    const readingList = await ReadingList.findByPk(id)
    if(!readingList){
        const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'reading list not found')
        next(error)
        return
    }
    req.readingList = readingList
    next()
}

//This middleware extracts the user id from the decoded token and attaches the user object to the request object
export const getUserById = async (req: Request, _res: Response, next: NextFunction) => {
    console.log('getUserById')
    // req.decodedToken = { username, id }
    const jwt: JwtPayload = req.decodedToken as JwtPayload
    // Check if id is present and valid
    if(!jwt.id || isNaN(parseInt(jwt.id as string))){
      const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'missing user id')
      next(error)
      return
    }
     // Check if username is present
    if(!jwt.username){
      const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'missing username')
      next(error)
      return
    }
  
    const userId:number = parseInt(jwt.id as string)
    const username:string = jwt.username as string
  
    //find user by id and check if user exists
    const user = await User.findByPk(userId)
    if(!user || user.username !== username){
      const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'user not found')
      next(error)
      return
    }
    req.user = user //Attach user to request object
    next()
}

//this middleware verifies if the user is the owner of the reading list to update
const checkOwnerOfTheReadingList = (req:Request, _res:Response, next:NextFunction) => {
    const owner = req.readingList.userId
    const currentUser = req.user.id
    if(owner !== currentUser){
        const err:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'you are not the owner of the reading list')
        next(err)
        return
    }
    next()
}

//verify if the blog is already set to "read"
const checkAlreadyRead = (req:Request, _res:Response, next:NextFunction) => {
    if(req.readingList.status === blogStatus.READ){
        const err:ErrorMsg = factory.getError(StatusCodes.BAD_REQUEST, 'blog already read')
        next(err)
        return
    }
    next()
}

/************************************ */
//COR
export const readingListCOR = [
    readingListParser,
    checkUserId,
    checkBlogId,
    checkNotInReadingList
]

export const updateListCOR = [
    tokenExtractor,
    updateListParser,
    searchReadingListById,
    getUserById,
    checkOwnerOfTheReadingList,
    checkAlreadyRead
]