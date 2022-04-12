const passport = require("passport");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const PORT = 4000;
const cookieSession = require("cookie-session");

require('./passport-setup')
app.use(cors());

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session-task",
    keys: ["key1", "key2"],
  })
);

const isLoggedIn = (req,res,next)=>{
    if(req.user){
        next();
    }
    else{
        res.sendStatus(401);
    }
}
// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('you are not logged in!!!')
})
app.get("/failed", (req, res) => res.send("login failed!!"));
app.get("/good",isLoggedIn, (req, res) => res.send(`Welcome to ${req.user.displayName}!`));
app.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/google/callback",passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

app.get('/logout',(req,res)=>{
req.session = null;
req.logOut();
res.redirect('/')
})
app.listen(PORT, () => console.log(`server running succfully at ${PORT}`));
