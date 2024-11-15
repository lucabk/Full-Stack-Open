/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import 'express-async-errors'; 
import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';
import blogRouter from './routes/blog';
import userRouter from './routes/user';
import loginRouter from './routes/login';
import authorRouter from './routes/author';
import listRouter from './routes/reading_list';
import logoutRouter from './routes/logout';
import { errorMiddleware } from './middleware/errors_middleware';
import { unknownEndpoint } from './middleware/unknown_endpoint_mid';
import morgan from 'morgan';
import cors from 'cors'
import sessionMiddleware from './utils/session';

//  @typescript-eslint/no-unsafe-member-access
morgan.token('body', (req: express.Request) => JSON.stringify(req.body))

/********app, cors, morgand and json body middleware******* */
const app = express()
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())

/*****session configuration******/
app.use(sessionMiddleware)

/*********routes*****************/
app.use('/api/authors', authorRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)  
app.use('/api/readinglists', listRouter)
app.use('/api/logout', logoutRouter)
app.use(unknownEndpoint)
app.use(errorMiddleware)


/*********start server***********/
const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start().catch(console.error)