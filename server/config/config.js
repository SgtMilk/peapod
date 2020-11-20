/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

require("dotenv").config();

const {
  PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  COOKIE_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  DATABASE_URI,
  HOME_PAGE_DOMAIN,
  LOCAL_SERVER_URL,
} = process.env;

const config = {
  Google: {
    clientID: GOOGLE_CLIENT_ID,
    secret: GOOGLE_CLIENT_SECRET,
  },
  Facebook: {
    clientID: FACEBOOK_CLIENT_ID,
    secret: FACEBOOK_CLIENT_SECRET,
  },
  PORT,
  COOKIE_SECRET,
  DATABASE_URI,
  HOME_PAGE_DOMAIN,
  LOCAL_SERVER_URL,
};

module.exports = config;
