import { Request, Response, NextFunction } from 'express';
import { newEntrySchema } from '../utils/type';

export const blogParser = (req: Request, _res: Response, next: NextFunction) => {
    console.log("blogParser")
    try{
        newEntrySchema.parse(req.body)
    }catch(err:unknown){
        next(err)
    }
    next()
}