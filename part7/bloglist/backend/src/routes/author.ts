import express from 'express'
import authorController from '../controllers/authorController'

const authorRouter = express.Router()

authorRouter.get('/', authorController.getAuthors)

export default authorRouter