import express from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Blog, User } from '../models';
import { userParser, userUpdateParser } from '../middleware/zodInput_middleware';
import { newUserEntry, newUsernameEntry } from '../utils/type';
import bcrypt from 'bcrypt';

const userRouter = express.Router()

//GET all
userRouter.get('/', async (_req, res) => {
    const users = await User.findAll({
        include: {
            model:Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})
//by id
userRouter.get('/:id', async (req, res) => {
    const id:number = Number(req.params.id)
    const user = await User.findByPk(id)
    if(!user){
        console.error("404 - user not found")
        res.status(StatusCodes.NOT_FOUND).json({ error: 'user not found'})
        return
    }   
    res.json(user)
})

//POST
userRouter.post('/', userParser, async (req: Request<unknown, unknown, newUserEntry>, res: Response<newUserEntry>) => {
    const { name, username, password } = req.body
    
    // Hash the password before saving
    const saltRounds:number = 10;
    const hashedPassword:string = await bcrypt.hash(password, saltRounds);
    //new user
    const newUserEntry:newUserEntry = { name, username, password:hashedPassword}

    const user = await User.create(newUserEntry)
    res.status(StatusCodes.CREATED).json(user)
})

//PUT
userRouter.put('/:username', userUpdateParser, async (req: Request<{ username:string}, unknown, newUsernameEntry>, res: Response<newUserEntry>) => {
    const oldUsername:string = String(req.params.username)
    const { username } = req.body //TODO: check password
    
    //find user by username
    const userToUpdate = await User.findOne({ where: { username:oldUsername }})

    if(!userToUpdate){
        console.error('user not found')
        res.status(StatusCodes.NOT_FOUND).end()
        return
    }
    //update the username
    await User.update({username}, {
        where : {username:oldUsername}
    })
    //find the updated user
    const updatedUser = await User.findOne({ where: { username } });
    if (!updatedUser) {
        console.error('Error retrieving updated user');
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        return;
    }
    //send updated user
    res.status(StatusCodes.OK).json(updatedUser);
})

export default userRouter