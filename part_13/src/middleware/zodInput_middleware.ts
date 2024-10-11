import { Request, Response, NextFunction } from 'express';
import { newEntrySchema, newUserSchema, newUsernameSchema } from '../utils/type';

export const blogParser = (req: Request, _res: Response, next: NextFunction) => {
    console.log("blogParser")
    try{
        newEntrySchema.parse(req.body)
    }catch(err:unknown){
        next(err)
    }
    next()
}

export const userParser = (req: Request, _res: Response, next: NextFunction) => {
    console.log('userParser')
    try{
        newUserSchema.parse(req.body)
    }catch(err:unknown){
        next(err)
    }
    next()
}

export const userUpdateParser = ( req: Request, _res: Response, next: NextFunction) => {
    console.log('userUpdateParser')
    try{
        newUsernameSchema.parse(req.body)
    }catch(err:unknown){
        next(err)
    }
    next()
}