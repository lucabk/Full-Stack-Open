import { config } from 'dotenv';

// Load environment variables from .env file into process.env
config();

export const DATABASE_URL: string | undefined = process.env.DATABASE_URL;
export const PORT: number = Number(process.env.PORT) || 3001;
export const KEY: string = String(process.env.KEY)