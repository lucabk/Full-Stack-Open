import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Blog, ReadingList, User } from '../models';
import { blogStatus, getUserByIdResponse, newUserEntry, newUsernameEntry, ReadingListQuery } from '../utils/type';
import bcrypt from 'bcrypt';
import { ErrorMsg, factory } from '../utils/errorFactory';


const getAllUsers = async (req:Request, res:Response<User[]>) => {

    //fetch disabled users
    if(req.query.disabled === 'true'){
        const disabledUsers = await User.scope('disabled').findAll({
            include: {
                model:Blog,
                attributes: { exclude: ['userId'] }
            }
        })
        res.json(disabledUsers)
    }

    //retrieve only active users
    else{
        const users = await User.findAll({
            include: {
                model:Blog,
                attributes: { exclude: ['userId'] }
            }
        })
        res.json(users)
    }
}

const getUser =  async (req:Request, res:Response< getUserByIdResponse >, next:NextFunction) => {
    //find user in db
    const id:number = Number(req.params.id)
    const user = await User.findByPk(id)

    if(!user){
        const err:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'user not found')
        next(err)
        return
    }

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
            where : { userId : id }
    }) as unknown as ReadingListQuery[] //Copilot hint

    //array of blogs with ReadingList id and status associated
    let allBlogs = ReadingListQuery.map(r => 
        ({ 
            readingList_id : r.id,
            status : r.status as blogStatus,
            blogs : r.blogs[0]
        })
    )

    //query string
    if (req.query.read === 'true'){
        allBlogs = allBlogs.filter( e => e.status === blogStatus.READ)
    }
    else if (req.query.read === 'false'){
        allBlogs = allBlogs.filter( e => e.status === blogStatus.UNREAD)
    }

    //default res   
    res.json({
        name : user.name,
        username : user.username,
        readings : allBlogs
    })
}

const createUser = async (req: Request<unknown, unknown, newUserEntry>, res: Response<newUserEntry>) => {
    const { name, username, password } = req.body
    
    // Hash the password before saving
    const saltRounds:number = 10;
    const hashedPassword:string = await bcrypt.hash(password, saltRounds);
    //new user
    const newUserEntry:newUserEntry = { name, username, password:hashedPassword}

    const user = await User.create(newUserEntry)
    res.status(StatusCodes.CREATED).json(user)
} 

const updateUser =  async (req: Request<{ username:string}, unknown, newUsernameEntry>, res: Response<newUserEntry>) => {
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
}

export default { 
    getAllUsers,
    getUser,
    createUser,
    updateUser
}