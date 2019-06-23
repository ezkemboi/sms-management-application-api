import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

// Creating a new pool instance
export const pool = new Pool({
    connectionString: databaseUrl
});

// Connecting to the database
pool.on('connect', () => {
    console.log('Connected to the db successfully')
});

// Creating tables function
export const createTables = async () => {
    const smsTable = `CREATE TABLE IF NOT EXISTS
        sms(
            id SERIAL PRIMARY KEY,
            sender VARCHAR(128) NOT NULL, 
            receiver VARCHAR(128) NOT NULL, 
            message VARCHAR(128) NOT NULL,
            status VARCHAR(128) NOT NULL,
            created_date TIMESTAMP
        )
    `;

    await pool.query(smsTable);

    const contactTable = `CREATE TABLE IF NOT EXISTS 
        contacts(
            id SERIAL PRIMARY KEY,
            name VARCHAR(128) NOT NULL,
            phone_number VARCHAR NOT NULL,
            created_date TIMESTAMP
        )
    `;
    await pool.query(contactTable);
};

// Dropping tables already creating
export const dropTables = async () => {
    const dropSmsTable = 'DROP TABLE IF EXISTS sms'
    const dropContactsTable = 'DROP TABLE IF EXISTS contacts'

    // Drop the table sms
    await pool.query(dropSmsTable);

    // Drop the table contacts 
    await pool.query(dropContactsTable);
};

pool.on('remove', () => {
    process.exit(0);
});

// To create and drop tables
require('make-runnable');
