import * as  mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()
export const connection = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
})
