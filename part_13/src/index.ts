import express from 'express';
import 'express-async-errors'; 
import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';
import blogRouter from './routes/blog';
import userRouter from './routes/user';
import loginRouter from './routes/login';
import authorRouter from './routes/author';
import { errorMiddleware } from './middleware/errors_middleware';
import { unknownEndpoint } from './middleware/unknown_endpoint_mid';
import morgan from 'morgan';//logging with morgan using the custom token
import cors from 'cors'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
morgan.token('body', (req: express.Request) => JSON.stringify(req.body))

const app = express()
app.use(cors())
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use('/api/authors', authorRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)//send token after sucessfully login
app.use(unknownEndpoint)
app.use(errorMiddleware)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start().catch(console.error)