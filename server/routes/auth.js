var express = require('express');
var router = express.Router();

const passport = require('passport');
const passportGithub =require('passport-github');
const passportLocal = require('passport-local');
const GithubStrategy = passportGithub.Strategy;
const LocalStrategy = passportLocal.Strategy;
const User = require("../schemas/User")

const DEPLOY_URL = process.env.DEPLOY_URL;

passport.use(new GithubStrategy({
  clientID: process.env.GH_CLIENT_ID,
  clientSecret: process.env.GH_CLIENT_SECRET,
  callbackURL: DEPLOY_URL + "/auth/github/callback"
},
  //The following function is called after user authenticates with github
  async (accessToken, refreshToken, profile, done) => {
    console.log("User authenticated through GitHub! In passport callback.");
    //Our convention is to build userId from displayName and provider
    const userId = `${profile.username}@${profile.provider}`;
    //See if document with this unique userId exists in database 
    let currentUser = await User.findOne({ id: userId });
    if (!currentUser) { //Add this user to the database
      currentUser = await new User({
        id: userId,
        displayName: profile.displayName,
        authStrategy: profile.provider
      }).save();
    }
    return done(null, currentUser);
  }));

passport.use(new LocalStrategy({ passReqToCallback: true },
  //Called when user is attempting to log in with local username and password. 
  //userId contains the email address entered into the form and password
  //contains the password entered into the form.
  async (req, userId, password, done) => {
    let thisUser;
    try {
      thisUser = await User.findOne({ id: userId });
      if (thisUser) {
        if (thisUser.password === password) {
          return done(null, thisUser);
        } else {
          req.authError = "The password is incorrect. Please try again" +
            " or reset your password.";
          return done(null, false)
        }
      } else { //userId not found in DB
        req.authError = "There is no account with email " + userId +
          ". Please try again.";
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
));

//Serialize the current user to the session
passport.serializeUser((user, done) => {
  console.log("In serializeUser.");
  console.log("Contents of user param: " + JSON.stringify(user));
  done(null, user.id);
});

//Deserialize the current user from the session
//to persistent storage.
passport.deserializeUser(async (userId, done) => {
  console.log("In deserializeUser.");
  console.log("Contents of userId param: " + userId);
  let thisUser;
  try {
    thisUser = await User.findOne({ id: userId });
    console.log("User with id " + userId +
      " found in DB. User object will be available in server routes as req.user.")
    done(null, thisUser);
  } catch (err) {
    done(err);
  }
});

/////////////////////////
//AUTHENTICATION ROUTES
/////////////////////////

//AUTHENTICATE route: Uses passport to authenticate with GitHub.
//Should be accessed when user clicks on 'Login with GitHub' button on 
//Log In page.
router.get('/github', passport.authenticate('github'));

//CALLBACK route:  GitHub will call this route after the
//OAuth authentication process is complete.
//req.isAuthenticated() tells us whether authentication was successful.
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log("auth/github/callback reached.")
    res.redirect('/'); //sends user back to login screen; 
    //req.isAuthenticated() indicates status
  }
);

//LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main router page. req.isAuthenticated() is toggled to false.
router.get('/logout', (req, res) => {
  console.log('/logout reached. Logging out');
  req.logout();
  res.redirect('/');
});

//TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up router state.
router.get('/test', (req, res) => {
  console.log("auth/test reached.");
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    console.log("User is authenticated");
    console.log("User record tied to session: " + JSON.stringify(req.user));
  } else {
    //User is not authenticated
    console.log("User is not authenticated");
  }
  //Return JSON object to client with results.
  res.json({ isAuthenticated: isAuth, user: req.user });
});

//LOGIN route: Attempts to log in user using local strategy
router.post('/login',
  passport.authenticate('local', { failWithError: true }),
  (req, res) => {
    console.log("/login route reached: successful authentication.");
    //Redirect to router's main page; the /auth/test route should return true
    res.status(200).send("Login successful");
  },
  (err, req, res, next) => {
    console.log(err);
    console.log("/login route reached: unsuccessful authentication");
    if (req.authError) {
      console.log("req.authError: " + req.authError);
      res.status(401).send(req.authError);
    } else {
      res.status(401).send("Unexpected error occurred when attempting to authenticate. Please try again.");
    }
    //Note: Do NOT redirect! Client will take over.
  });


module.exports = router;