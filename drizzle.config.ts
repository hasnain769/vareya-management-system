import { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';
import path from "path";

dotenv.config(
    {path : '.env',}
)

export default {
    driver :"pg",
    schema : "./src/database/schema.ts",
    out: "./drizzle",
    dbCredentials :{
        connectionString :process.env.NEXT_PUBLIC_DATABASE_URL as string,
    },

} satisfies Config