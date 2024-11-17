import express from 'express';
import { userParser, userUpdateParser } from '../middleware/zodInput_middleware';
import userController from '../controllers/userController'

const userRouter = express.Router()

//GET 
userRouter.get('/', userController.getAllUsers)

userRouter.get('/:id', userController.getUser)

//POST
userRouter.post('/', userParser, userController.createUser)

//PUT
userRouter.put('/:username', userUpdateParser, userController.updateUser)

export default userRouter