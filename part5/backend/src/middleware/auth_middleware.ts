import express from 'express'
import jwt from "jsonwebtoken"
import { KEY } from '../utils/config'
import { StatusCodes } from 'http-status-codes'
import { getUserById } from './reading_list_mid'
import { ErrorMsg, factory } from '../utils/errorFactory'

//JWT Middleware
const tokenExtractor = (req: express.Request, res: express.Response, next: express.NextFunction) => {
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


//Session middleware
const sessionValidator = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.log('sessionValidator')
  if (!req.session || !req.session.userId || req.session.userId !== req.user.id){
    const err:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'session expired')
    next(err)
    return
  }
  next()  
}


/* N.B. Session settings:
 - Login:
    When the user logs in, the server creates a new session and saves the necessary values (such as userId and token) in req.session.
    The server sends a session cookie to the client (browser or Postman).
 - Subsequent Requests:
    For subsequent requests, the client sends the session cookie to the server.
    express-session uses the session ID in the cookie to load the associated session from the database.
    The values saved in req.session during login will be available in req.session for all subsequent requests.
*/

//Authentication COR
export const authCOR = [
  tokenExtractor,
  getUserById,    //works also to stop disabled user (default scope)
  sessionValidator,
]