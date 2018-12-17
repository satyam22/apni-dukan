import mysql from 'mysql';
import util from 'util';
import { DB_HOST, DB_NAME,DB_USER,DB_PASSWORD } from './../../server_config';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST || 'localhost',
  port: 3310,
  database: DB_NAME || 'testdb',
  user: DB_USER || 'testuser',
  password: DB_PASSWORD|| 'testpassword',
  multipleStatements: true,
  insecureAuth: true
});

pool.query = util.promisify(pool.query);

module.exports = pool;
