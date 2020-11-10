require("dotenv").config();

const {
  PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  COOKIE_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
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
};

export default config;
