import express, { NextFunction } from 'express'
import { Request, Response } from 'express';
import * as COR from '../middleware/auth_middleware'
import { StatusCodes } from 'http-status-codes';

//router
const logoutRouter = express.Router()
    
logoutRouter.post('/', COR.authCOR, (req:Request, res:Response, next:NextFunction) => {
    //destroy session
    req.session.destroy((err) => {
        if(err){
            console.error('Session destruction error:', err)
            next(err)
            return            
        }
        //destroy user cookie
        res.clearCookie('connect.sid')
        res.status(StatusCodes.OK).json({message:'logout successful'})
    })
})


export default logoutRouter