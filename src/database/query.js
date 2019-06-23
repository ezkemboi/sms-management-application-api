/**
 * Function to help query database
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Set the correct environment development, test or production
const env = process.env.NODE_ENV

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

// Creating a new pool instance
const pool = new Pool({
    connectionString: databaseUrl
});

export default {
    /**
     * @param {object} req
     * @param {object} res
     * @param {object} object
     */
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
