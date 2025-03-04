import Blog from "./blogs";
import User from "./users";
import ReadingList from "./reading_list";
import Membership from "./membership";

//One-To-Many relationships
User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(ReadingList, { through:Membership })
ReadingList.belongsToMany(Blog, { through:Membership })

export { Blog, User, ReadingList, Membership }