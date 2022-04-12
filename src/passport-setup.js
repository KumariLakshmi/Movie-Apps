const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.serializeUser((user, done) => {
  done(err, user);
});

passport.deserializeUser((user, done) => {
  done(err, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "629958340934-crt3irpqgbkj16q56a5eod9fo751g5l6.apps.googleusercontent.com",
      clientSecret:
       "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",
      callbackURL: 
      "https://localhost:4000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(err, profile);
    }
  )
);
