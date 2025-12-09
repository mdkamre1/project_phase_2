/* eslint-env node */
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "consulting",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;
