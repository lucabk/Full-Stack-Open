import express from 'express';
import 'express-async-errors'; 
import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';
import blogRouter from './routes/blog';
import { errorMiddleware } from './middleware/errors_middleware';


const app = express()
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.use(errorMiddleware)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start().catch(console.error)