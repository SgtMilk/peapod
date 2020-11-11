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
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("./config");
const pool = require("./pg-config");
const tables = require("../database/tables");
const { v4: uuidv4 } = require("uuid");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  /* 
    Find in db and return
    */
  const connection = await pool.connect();
  const userQuery = await connection.query(
    `SELECT * FROM ${tables.users} WHERE user_uuid='${id}'`
  );
  const user = userQuery.rows[0];
  connection.release();
  if (!user) {
    done(new Error("Failed to deserialize an user."));
  } else {
    done(null, user);
  }
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
      const connection = await pool.connect();
      const userQuery = await connection.query(
        `SELECT * FROM ${tables.users} WHERE google_id='${profile.id}' OR email='${profile.emails[0].value}';`
      );
      const user = userQuery.rows[0];
      if (!user) {
        /* 
        Create a user
        */
        const uuid = uuidv4();
        const newUserQuery = await connection.query(
          `INSERT INTO ${tables.users}(user_uuid, email, firstname, lastname, google_id, riskLevel) VALUES('${uuid}', '${profile.email}', '${profile.firstname}', '${profile.lastname}', '${profile.id}', '${profile.riskLevel}');`
        );
        const newUser = newUserQuery.rows[0];
        connection.release();
        if (!newUser) {
          done(new Error("Cannot create a new user!"));
        } else {
          done(null, newUser);
        }
      } else if (user && !user.googleID) {
        /*
        Update user's google id
        */
        const updatedUserQuery = await connection.query(
          `UPDATE ${tables.users} SET google_id='${profile.id}' WHERE email='${profile.emails[0].value}';`
        );
        const updatedUser = updatedUserQuery.rows[0];
        connection.release();
        done(null, updatedUser);
      } else {
        connection.release();
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.Facebook.clientID,
      clientSecret: config.Facebook.secret,
      callbackURL: "/auth/facebook/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const connection = await pool.connect();
      const userQuery = await connection.query(
        `SELECT * FROM ${tables.users} WHERE facebook_id='${profile.id}' OR email='${profile.emails[0].value}';`
      );
      const user = userQuery.rows[0];
      if (!user) {
        /* 
        Create a user
        */
        const uuid = uuidv4();
        const newUserQuery = await connection.query(
          `INSERT INTO ${tables.users}(user_uuid, email, firstname, lastname, facebook_id, riskLevel) VALUES('${uuid}', '${profile.email}', '${profile.firstname}', '${profile.lastname}', '${profile.id}', '${profile.riskLevel}');`
        );
        const newUser = newUserQuery.rows[0];
        connection.release();
        if (!newUser) {
          done(new Error("Cannot create a new user!"));
        } else {
          done(null, newUser);
        }
      } else if (user && !user.facebook_id) {
        /*
        Update user's google id
        */
        const updatedUserQuery = await connection.query(
          `UPDATE ${tables.users} SET facebook_id='${profile.id}' WHERE email='${profile.emails[0].value}';`
        );
        const updatedUser = updatedUserQuery.rows[0];
        connection.release();
        done(null, updatedUser);
      } else {
        connection.release();
        done(null, user);
      }
    }
  )
);
