import express from "express"
import { readingListCOR } from "../middleware/reading_list_mid"
import * as readingListController from '../controllers/reading_listController'

const listRouter = express.Router()

//Adding a blog to the reading list
listRouter.post('/',
    readingListCOR,
    readingListController.addToReadingList
)

export default listRouter