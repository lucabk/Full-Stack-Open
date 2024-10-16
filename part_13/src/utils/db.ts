import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";
import { Umzug, SequelizeStorage } from "umzug";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      // Create a new instance of Sequelize using the database URL from environment variables
      Database.instance = new Sequelize(DATABASE_URL as string, {
        dialect: 'postgres',
      });
    }
    return Database.instance;
  }
}

export const sequelize = Database.getInstance();

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

// Seed
const runSeeds = async () => {
  const seeder = new Umzug({
    migrations: {
      glob: '/home/luca/fullstackopen/Full-Stack-Open/part_13/src/seeds/*.ts', 
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: 'seeds' }),
    logger: console,
  });
  const seeds = await seeder.up();
  console.log('Seeds up to date', {
    files: seeds.map((seed) => seed.name),
  });
}

export const connectToDatabase = async () => {
    try {
      await sequelize.authenticate()
      await runMigrations()
      await runSeeds()
      console.log('connected to the database')
    } catch (err) {
      console.log('failed to connect to the database',err)
      return process.exit(1)
    }
  
    return null
  }