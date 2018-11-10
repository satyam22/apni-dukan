import mysql from 'mysql';
import util from 'util';
import { DB_HOST, DB_NAME,DB_USER,DB_PASSWORD } from './../../server_config';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST || '35.196.48.248',
  port: 3306,
  database: DB_NAME || 'slicepay',
  user: DB_USER || 'satyam',
  password: DB_PASSWORD|| 'satyam123',
  multipleStatements: true,
  insecureAuth: true
});

pool.query = util.promisify(pool.query);

module.exports = pool;
