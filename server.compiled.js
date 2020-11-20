"use strict";

var _expressSession = _interopRequireDefault(require("express-session"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
var passport = require("passport");

require('dotenv').config();

var LOCAL_PORT = 8081;
var PORT = process.env.PORT || LOCAL_PORT;
var app = (0, _express["default"])(); //////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////

var connectStr = process.env.MONGO_STR;
var DEPLOY_URL = process.env.DEPLOY_URL;

_mongoose["default"].connect(connectStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Connected to ".concat(connectStr, "."));
}, function (err) {
  console.error("Error connecting to ".concat(connectStr, ": ").concat(err));
}); //////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////


app.use((0, _expressSession["default"])({
  secret: "AcreditAid",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60
  }
})).use(_express["default"]["static"](_path["default"].join(__dirname, "client/build"))).use(passport.initialize()).use(passport.session()).use(_express["default"].json({
  limit: '20mb'
})).use(_express["default"].urlencoded({
  extended: true
})).listen(PORT, function () {
  return console.log("Listening on ".concat(PORT));
}); //Import routers

var api = require("./server/routes/api");

var auth = require("./server/routes/auth");

var email = require("./server/routes/email"); //Routers need to be added after middleware has been assigned  


app.use('/api', api);
app.use('/auth', auth);
app.use("/email", email);
