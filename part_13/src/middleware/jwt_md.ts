import express from 'express'
import jwt from "jsonwebtoken"
import { KEY } from '../utils/config'
import { StatusCodes } from 'http-status-codes'

export const tokenExtractor = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //The function retrieves the value of the Authorization header from the request object using the get method
    const authorization = req.get('authorization')
    //The function checks if the authorization header exists and if it starts with the string 'Bearer '
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        //The function jwt.verify decodes the token
        req.decodedToken = jwt.verify(authorization.substring(7), KEY)//types/express/index.d.ts
      }catch{
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'token invalid' })
        return
      }
    //If the authorization header is not present or does not start with 'Bearer ' -> token missing
    }else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'token missing' })
        return
    }
    next()
}