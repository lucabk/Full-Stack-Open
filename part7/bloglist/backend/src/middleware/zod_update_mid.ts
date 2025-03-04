import { Request, Response, NextFunction } from 'express';
import { newLikeSchema } from '../utils/type';

export const updateParser = (req: Request, _res: Response, next: NextFunction) => {
    console.log('updateParser')
    try{
        newLikeSchema.parse(req.body)
    }catch(err:unknown){
        next(err)
    }
    next()
}