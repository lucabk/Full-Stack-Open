import Blog from "./blogs";
import User from "./users";

// Function to sync the Blog model
async function syncallModels() {
    await Blog.sync(); // Sequelize executes the command 'CREATE TABLE IF NOT EXISTS "blogs"...' to Postegres
    await User.sync();
  }
  
// Call the sync function to db
syncallModels().catch(console.error);

export { Blog, User }