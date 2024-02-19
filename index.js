const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors(), express.json());
require('dotenv/config');
require('./database/Database');
const signinRoute = require("./routes/authentication/signinRoute");
const signupRoute = require("./routes/authentication/signupRoute");
const FetchProfileInfo = require("./routes/profileInfo/FetchProfileInfo");

app.use('/signin',signinRoute);
app.use('/signup',signupRoute);
app.use('/fetch-profile-info', FetchProfileInfo);


async function connectAndStartServer() {
  app.listen(process.env.PORT, () => {
    console.log(`Server running!`);
  });
}

connectAndStartServer().catch(err => {
  console.error(err);
});