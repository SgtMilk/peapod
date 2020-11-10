/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
const express = require("express");
const passport = require("passport");
const router = require("./routes/root");
const config = require("./config/config");
const router = require("./routes/root");
require("./config/passport-setup");
require("express-async-errors");

const app = express();
app.use(passport.initialize());
app.use(passport.session());
