import { Request, Response, NextFunction } from 'express';
import { newEntrySchema, newReadingListSchema, newUserSchema, newUsernameSchema } from '../utils/type';

export const blogParser = (req: Request, _res: Response, next: NextFunction) => {
    console.log("blogParser")
    newEntrySchema.parse(req.body)
    next()
}

export const userParser = (req: Request, _res: Response, next: NextFunction) => {
    console.log('userParser')
    newUserSchema.parse(req.body)
    next()
}

export const userUpdateParser = ( req: Request, _res: Response, next: NextFunction) => {
    console.log('userUpdateParser')
    newUsernameSchema.parse(req.body)
    next()
}

export const readingListParser = ( req: Request, _res: Response, next: NextFunction) => {
    console.log('readingListParser')
    newReadingListSchema.parse(req.body)
    next()
}