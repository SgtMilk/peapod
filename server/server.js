/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */


/**
 * Imports
 */

//the mighty Express herself
const express = require("express");

//middleware
const cors = require("cors");
const bodyparser = require("body-parser");

//service methods
const auth = require("./controllers/auth");
const pods = require("./controllers/pods");
const activities = require("./controllers/activities");

//authentication
const passport = require("passport");
const router = require("./routes/root");
const config = require("./config/config");
require("./config/passport-setup");
require("express-async-errors");

//database
const { Pool, Client } = require("pg");
const pgconfig = require("./config/pgconfig");
const connectionString = config.DATABASE_URI;
/**
 * PG DB connection
 */

 const pool = new Pool({
     connectionString,
 });
/**
 * Middleware
 */

const app = express();

app.use(passport.initialize());
app.use(passport.session());

/**
 * Controller functions
 */

 