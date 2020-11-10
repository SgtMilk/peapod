const express = require("express");
const passport = require("passport");
const {} = require("../controllers/auth");
const config = require("../config/config");
require("express-async-errors");

const auth = express.Router();
const google = express.Router();

// AUTHENTICATION
auth.get("/login/success", loginSuccess);
auth.get("/login/failed", loginFailed);
auth.get("/logout", logout);

//  GOOGLE
google.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
google.get(
  "/redirect",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed",
  })
);

auth.use("/google", google);
export default auth;
