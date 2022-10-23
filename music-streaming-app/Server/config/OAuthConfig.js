const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');


module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/trusic",
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          User.findOne(
            { email: profile.emails[0].value },
            async (err, user) => {
              if (err) {
                return done(err);
              }
              if (!user) {
                const newUser = new User({
                  googleId: profile.id,
                  email: profile.emails[0].value,
                  name: profile.displayName
                });
                await newUser.save();
                return done(null, newUser);
              }
              return done(null, user);
            }
          );
          
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    try {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    } catch (err) {
      console.log(err);
    }
  });

};