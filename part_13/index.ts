import express from 'express';
import 'express-async-errors'; 
import { config } from 'dotenv';
import { Sequelize, DataTypes, Model, ValidationError } from 'sequelize';
import { StatusCode } from './utils/type';

// Load environment variables from .env file into process.env
config();

// Web application
const app = express()
app.use(express.json())

// Create a new instance of Sequelize using the database URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
});


// Model definition
class Blog extends Model {}
Blog.init(
  {
    //Model attributes
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author:{
      type: DataTypes.STRING // VARCHAR(255)
    },
    url:{
      type: DataTypes.STRING,
      allowNull: false
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    likes:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize, // We need to pass the connection instance
    tableName: 'blogs', //explicit table name inference
    timestamps: false, // not have to use the timestamps columns (created_at and updated_at)
    modelName: 'blog', // We need to choose the model name
  },
)

// Function to sync the Blog model
async function syncBlogModel() {
  await Blog.sync(); // Sequelize executes the command 'CREATE TABLE IF NOT EXISTS "blogs"...' to Postegres
}
// Call the sync function
syncBlogModel().catch(console.error);

//GET
app.get('/api/blogs', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.status(StatusCode.Ok).json(blogs)
  console.log(JSON.stringify(blogs, null, 2))
})
app.get('/api/blogs/:id', async (req, res) => {
  const id:number = Number(req.params.id)
  const blog = await Blog.findByPk(id)
  if (blog === null){
    console.error("404 - Blog not found");
    res.status(StatusCode.NotFound).json({error:'blog not found'})
    return
  }
  res.json(blog)
  console.log(blog.toJSON())
})

//POST
app.post('/api/blogs', async (req, res) => {
  console.log(req.body)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const blog = await Blog.create(req.body)
  res.status(StatusCode.Created).json(blog)
})

//DELETE
app.delete('/api/blogs/:id', async (req, res) => {
  const id:number = Number(req.params.id)
  try{
    const result = await Blog.destroy({
      where: {id}
    })
    if(result===0){
      res.status(StatusCode.NotFound).json({ error: 'Blog not found' });
    } else {
      res.status(StatusCode.NoContent).end();
    }
  }catch(error){
    console.error(error)
    res.status(StatusCode.InternalServerError).json({ error: 'Something went wrong' });
  }

})

app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(error);
  if(error instanceof ValidationError){
    res.status(StatusCode.BadRequest).json({ error : 'Sequelize notNull Violation' })
    //return //return before calling Express error handler with next(error), avoiding console errors output
  }
  next(error)
});

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})