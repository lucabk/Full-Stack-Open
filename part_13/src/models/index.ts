import Blog from "./blogs";
import User from "./users";

//One-To-Many relationships
User.hasMany(Blog)
Blog.belongsTo(User)

// Function to sync the Blog model
async function syncallModels() {    
  await User.sync({ alter: true });
  await Blog.sync({ alter: true }); // Sequelize executes the command 'CREATE TABLE IF NOT EXISTS "blogs"...' to Postegres

  }
  
// Call the sync function to db
syncallModels().catch(console.error);

export { Blog, User }