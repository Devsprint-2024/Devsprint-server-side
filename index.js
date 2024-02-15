const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors(), express.json());
require('dotenv/config');
const signinRoute = require("./routes/authentication/signinRoute");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/*
async function checkDatabaseConnection() 
{
  try 
  {
    const connection = await pool.promise().getConnection();
    console.log('Connected to MySQL database successfully');
    connection.release();
  } 
  catch (err) 
  {
    console.error('Error connecting to MySQL database:', err);
  }
}
checkDatabaseConnection();
*/

app.use('/signin',signinRoute);

async function connectAndStartServer() {
  app.listen(process.env.PORT, () => {
    console.log(`Server running!`);
  });
}

connectAndStartServer().catch(err => {
  console.error(err);
});
