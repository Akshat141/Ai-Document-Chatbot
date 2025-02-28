const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const GoogleStrategy = require
("passport-google-oauth20").Strategy;
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname, "/public")))
app.use(session({secret:"secret", resave: false, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
{
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, 
(accesToken, refreshToken, profile, done)=>{
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/",(req,res)=>{
  res.sendFile("index.html");
})

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // res.send(`Welcome, ${req.user.displayName}`);
    res.render("home", {name:req.user.displayName});
  }
);


app.listen(3000,()=>{
  console.log("Server running on http://localhost:3000");
})