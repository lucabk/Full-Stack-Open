import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";

// Create a new instance of Sequelize using the database URL from environment variables
export const sequelize = new Sequelize(DATABASE_URL as string, {
    dialect: 'postgres',
});

export const connectToDatabase = async () => {
    try {
      await sequelize.authenticate()
      console.log('connected to the database')
    } catch (err) {
      console.log('failed to connect to the database',err)
      return process.exit(1)
    }
  
    return null
  }