//this file is the single source of truth of all things configuration in an environment variable

import * as dotenv from 'dotenv';

dotenv.config(); 


export default { 
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRE
    }
}