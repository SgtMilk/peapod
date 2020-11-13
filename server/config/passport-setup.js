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
  done(null, user.user_uuid);
});

passport.deserializeUser(async (user_uuid, done) => {
  /* 
    Find in db and return
    */
  const connection = await pool.connect();
  const userQuery = await connection.query(
    `SELECT * FROM ${tables.users} WHERE user_uuid='${user_uuid}'`
  );
  const user = userQuery.rows[0];
  await connection.release();
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
        const createUserQuery = await connection.query(
          `INSERT INTO ${tables.users}(user_uuid, email, firstname, lastname, google_id, riskLevel) VALUES('${uuid}', '${profile.emails[0].value}', '${profile.name.givenName}', '${profile.name.familyName}', '${profile.id}', '${0}');`
        );
        const newUserQuery = await connection.query(`SELECT * FROM ${tables.users} WHERE user_uuid='${uuid}';`);
        const newUser = newUserQuery.rows[0];
        await connection.release();
        done(null, newUser);
      } else if (user && !user.google_id) {
        /*
        Update user's google id
        */
        const updatedUserQuery = await connection.query(
          `UPDATE ${tables.users} SET google_id='${profile.id}' WHERE email='${profile.emails[0].value}';`
        );
        const userQuery = await connection.query(`SELECT * FROM ${tables.users} WHERE google_id='${profile.id}';`);
        const updatedUser = userQuery.rows[0];
        await connection.release();
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
      profileFields: ['id', 'emails', 'name'] //This
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
        const createUserQuery = await connection.query(
          `INSERT INTO ${tables.users}(user_uuid, email, firstname, lastname, facebook_id, riskLevel) VALUES('${uuid}', '${profile.emails[0].value}', '${profile.name.givenName}', '${profile.name.familyName}', '${profile.id}', '${0}');`
        );
        const newUserQuery = await connection.query(`SELECT * FROM ${tables.users} WHERE user_uuid='${uuid}';`);
        const newUser = newUserQuery.rows[0];
        await connection.release();
        done(null, newUser);
      } else if (user && !user.facebook_id) {
        /*
        Update user's google id
        */
        const updatedUserQuery = await connection.query(
          `UPDATE ${tables.users} SET facebook_id='${profile.id}' WHERE email='${profile.emails[0].value}';`
        );
        const userQuery = await connection.query(`SELECT * FROM ${tables.users} WHERE facebook_id='${profile.id};`);
        const updatedUser = userQuery.rows[0];
        await connection.release();
        done(null, updatedUser);
      } else {
        connection.release();
        done(null, user);
      }
    }
  )
);
