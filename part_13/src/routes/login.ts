import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { User } from "../models"
import { newUsernameEntry } from "../utils/type"
import exepress from 'express'
import { userUpdateParser } from "../middleware/zodInput_middleware"
import { Request, Response } from 'express';
import { KEY } from "../utils/config"
import { StatusCodes } from "http-status-codes"

const loginRouter = exepress.Router()

loginRouter.post('/', userUpdateParser, async (req: Request<unknown, unknown, newUsernameEntry>, res:Response) => {
    const { username, password } = req.body
    const userToAuthenticate = await User.findOne({ where : {username}})
    
    //If the user is found, the code compares the provided password with the stored password hash
    const passwordCorrect = userToAuthenticate === null ? 
        false : 
        await bcrypt.compare(password,(userToAuthenticate.password))

    //If the user is not found or the password is incorrect
    if(!userToAuthenticate || !passwordCorrect){
        console.error('user not found or incorrect password')
        res.status(StatusCodes.UNAUTHORIZED).end()
        return
    }
    //If the credentials are valid, the code creates a token payload (userForToken) containing the username and id
    const userForToken = {
        username: username,
        id: userToAuthenticate.id
    }
    /*The token is then signed using a secret key from the environment variables and expires in one hour
    Once the token expires, the client app needs to get a new token. Usually, this happens by forcing the user to re-login to the app*/
    const token = jwt.sign(
        userForToken,
        KEY,
        { expiresIn: 60*60 }
    )
    res.send({token, username})
    console.log('TOKEN sent')
})


export default loginRouter