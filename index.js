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
const createNewProject = require("./routes/createNewProject/createNewProject");
const myProjectInfo = require("./routes/myProjectInfo/myProjectInfo");
const sourceCodes = require('./routes/sourceCodes/sourceCodes');

app.use('/signin',signinRoute);
app.use('/signup',signupRoute);
app.use('/fetch-profile-info', FetchProfileInfo);
app.use('/create-project',createNewProject);
app.use('/fetch-my-projects', myProjectInfo);
app.use('/source-codes', sourceCodes);

async function connectAndStartServer() {
  app.listen(process.env.PORT, () => {
    console.log(`Server running!`);
  });
}

connectAndStartServer().catch(err => {
  console.error(err);
});