import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV

let poolDetails = {
    user: process.env.USER,
    host: 'localhost',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432
}

// change pool details based on env
if(env === 'test') {
    poolDetails.database = process.env.TEST_DATABASE
}

// Creating a new pool instance
export const pool = new Pool(poolDetails);

console.log({ pool })

// Connecting to the database
pool.on('connect', () => {
    console.log('Connected to the db successfully')
});

// Creating tables function
export const createTables = async () => {
    const contactTable = `CREATE TABLE IF NOT EXISTS 
        contacts(
            id SERIAL PRIMARY KEY,
            name VARCHAR(128) NOT NULL,
            phone_number VARCHAR NOT NULL,
            created_date TIMESTAMP
        )
    `;

    await pool.query(contactTable);

    const smsTable = `CREATE TABLE IF NOT EXISTS
        sms(
            id SERIAL PRIMARY KEY,
            sender_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE, 
            receiver_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE, 
            message VARCHAR(128) NOT NULL,
            status VARCHAR(128) NOT NULL,
            created_date TIMESTAMP
        )
    `;

    await pool.query(smsTable);
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
