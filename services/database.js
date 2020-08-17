const mysql = require('mysql'),

db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database : process.env.DATABASE
});

module.exports = db;
