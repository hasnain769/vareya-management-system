import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

config();
import { Logger } from 'drizzle-orm/logger';

class MyCustomLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log({ query, params });
  }
}

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL ;

if (!databaseUrl) {
  console.log("no database url")
  throw new Error('Database connection string is missing. Please set DRIZZLE_DATABASE_URL environment variable.');
}


const sql = neon(databaseUrl);
//const response  =  fetch('http://localhost:3000/api/orders-details');
// Create database instance using drizzle
console.log("dataBase connection made ")
export const db = drizzle(sql,{logger:new MyCustomLogger});
