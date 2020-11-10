/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/**
 * RESOURCES:
 *  - https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0
 *  - https://www.youtube.com/playlist?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
 *  - http://www.passportjs.org/docs/google/
 *  - http://www.passportjs.org/packages/passport-linkedin-oauth2/
 *  - http://www.passportjs.org/packages/passport-local/
 */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("./config");
const pgconfig = require("./pg-config");

pgconfig.connect();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  /* 
    Find in db and return
    */
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(() => {
      done(new Error("Failed to deserialize an user"));
    });
});

//  https://stackoverflow.com/questions/56798593/facebook-authentication-strategy-with-passport-js-express-and-typescript
passport.use(
  new GoogleStrategy(
    {
      clientID: config.Google.clientID,
      clientSecret: config.Google.secret,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({
        $or: [{ googleID: profile.id }, { email: profile.emails[0].value }],
      });

      if (!user) {
        /* 
        Create a user
        */
        const newUser = await new User({
          displayName: profile.displayName,
          name: profile.name,
          email: profile.emails[0].value,
          googleID: profile.id,
          // eslint-disable-next-line nos-underscore-dangle
          createdAt: new Date(),
          security: {
            activated: true,
            verified: false,
            public: false,
          },
          analysesCount: 0,
          account: "INVESTOR",
        }).save();

        if (newUser) done(null, newUser);
      }

      if (user && !user.googleID) {
        user.googleID = profile.id;
        await user.save();
      }

      done(null, user);
    }
  )
);
