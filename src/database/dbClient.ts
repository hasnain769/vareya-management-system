import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
console.log(process.env.DATABASE_URL);
const db = drizzle(sql);
console.log(db)

export default db;
