import express from "express"
import * as COR from "../middleware/reading_list_mid"
import * as readingListController from '../controllers/reading_listController'
import * as authCOR from '../middleware/auth_middleware'

const listRouter = express.Router()

//Adding a blog to the reading list
listRouter.post('/',
    COR.readingListCOR,
    readingListController.addToReadingList
)

//set a blog as read
listRouter.put('/:id',
    authCOR.authCOR,
    COR.updateListCOR,
    readingListController.updateReadingList
)

export default listRouter