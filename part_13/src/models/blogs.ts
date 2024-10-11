import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db';


interface BlogAttributes {
  id?:number
  author?:string
  url:string
  title:string
  likes:number
  userId: number
}
// Model definition
class Blog extends Model<BlogAttributes> implements BlogAttributes {
  public id!:number;
  public author?: string | undefined;
  public url!: string;
  public title!: string;
  public likes!: number;
  public userId!: number;
}
Blog.init(
  {
    //Model attributes
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author:{
      type: DataTypes.STRING, // VARCHAR(255)
      allowNull: true
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
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }      
    }
  },
  {
    sequelize, // We need to pass the connection instance
    tableName: 'blogs', //explicit table name inference
    timestamps: false, // not have to use the timestamps columns (created_at and updated_at)
    modelName: 'blog', // We need to choose the model name
  },
);

export default Blog;