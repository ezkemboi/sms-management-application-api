import { Client, Pool } from 'pg';
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

export const pool = new Pool({
    connectionString: databaseUrl
});

export const client = new Client({
    connectionString: databaseUrl
});
