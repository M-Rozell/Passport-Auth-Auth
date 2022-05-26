import * as mysql from "mysql";
import config from "../config";

const pool = mysql.createPool(config.db)


export const Query = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    });
}

import users from './queries/users';

export default {
    users
}