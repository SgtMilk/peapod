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

//database
const { Pool, Client } = require("pg");
const pgconfig = require("./config/pgconfig");

//service methods
const auth = require("./controllers/auth");
const pods = require("./controllers/pods");
const activities = require("./controllers/activities");

/**
 * PG DB connection
 */

 const pool = new Pool({
     user: pgconfig.dbuser,
     host: pgconfig.host,
     database: pgconfig.database,
     password: pgconfig.password,
     port: pgconfig.port,
 });

/**
 * Middleware
 */




/**
 * Controller functions
 */