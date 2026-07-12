import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

// connectedDB
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

pool.on("connect", () => {
    console.log("connected to the database")
})

pool.on("error", (err) => {
    console.log("unexpected error inside the database", err);
})

export default pool;
