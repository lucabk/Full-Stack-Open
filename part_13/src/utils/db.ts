import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";
import { Umzug, SequelizeStorage } from "umzug";

// Create a new instance of Sequelize using the database URL from environment variables
export const sequelize = new Sequelize(DATABASE_URL as string, {
    dialect: 'postgres',
});

// Migration
const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: '/home/luca/fullstackopen/Full-Stack-Open/part_13/src/migrations/*.ts',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

export const connectToDatabase = async () => {
    try {
      await sequelize.authenticate()
      await runMigrations()
      console.log('connected to the database')
    } catch (err) {
      console.log('failed to connect to the database',err)
      return process.exit(1)
    }
  
    return null
  }