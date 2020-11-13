/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/**
 * Imports
 */
const pool = require("../config/pg-config");
require("express-async-errors");

/**
 * Service functions
 */

const loginSuccess = (req, res, next) => {
  if (req.user)
    res.json({
      success: true,
      message: "User has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
};

const loginFailed = (req, res, next) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
};

const logout = (req, res, next) => {
  req.logout();
  res.send({ success: true, message: "User successfully logged out." });
};

const authCheck = (req, res, next) => {
  if (!req.user) {
    //  MIGHT BE BETTER TO REDIRECT TO LOGIN PAGE
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

module.exports = { loginSuccess, loginFailed, logout, authCheck };
