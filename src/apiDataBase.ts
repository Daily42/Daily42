import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';

dotenv.config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
  ssl: { rejectUnauthorized: true },
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
});

export default pool;
export const select = async (sql: string) => {
  return (await pool.execute(sql))[0];
};
