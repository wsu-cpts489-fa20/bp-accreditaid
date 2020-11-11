//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////

import session from 'express-session';
import regeneratorRuntime from "regenerator-runtime";
import path from 'path';
import express from 'express';
const passport = require("passport");
require('dotenv').config();

const LOCAL_PORT = 8081;
const PORT = process.env.HTTP_PORT || LOCAL_PORT;
const app = express();

const api = require("./server/routes/api");
const auth = require("./server/routes/auth");


//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
import mongoose from 'mongoose';


const connectStr = process.env.MONGO_STR;
const DEPLOY_URL = process.env.DEPLOY_URL;
mongoose.connect(connectStr, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    () =>  {console.log(`Connected to ${connectStr}.`)},
    err => {console.error(`Error connecting to ${connectStr}: ${err}`)}
);

//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////
app
  .use(session({secret: "AcreditAid", 
                resave: false,
                saveUninitialized: false,
                cookie: {maxAge: 1000 * 60}}))
  .use(express.static(path.join(__dirname,"client/build")))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json({limit: '20mb'}))
  .use(express.urlencoded())
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//Routers need to be added after middleware has been assigned  
app.use('/api', api);
app.use('/auth', auth );