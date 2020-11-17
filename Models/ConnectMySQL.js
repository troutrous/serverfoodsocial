const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_CONFIG_HOST,
  user: process.env.DB_CONFIG_USER,
  password: process.env.DB_CONFIG_PASSWORD,
  database: process.env.DB_CONFIG_DB,
});
connection.connect((error) => {
  if (error) {
    console.log(process.env.DBCONFIG_HOST);
    throw error;
    
  }
  console.log("Successfully connect to the database");
});

module.exports = connection;
