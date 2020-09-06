/**
 * Function to help query database
 */
import dotenv from 'dotenv';
import { pool } from './config'

dotenv.config();

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
