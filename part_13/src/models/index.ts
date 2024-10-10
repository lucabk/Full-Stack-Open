import Blog from "./blogs";

// Function to sync the Blog model
async function syncBlogModel() {
    await Blog.sync(); // Sequelize executes the command 'CREATE TABLE IF NOT EXISTS "blogs"...' to Postegres
  }
  
// Call the sync function to db
syncBlogModel().catch(console.error);

export { Blog }