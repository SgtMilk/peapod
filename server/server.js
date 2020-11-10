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
const http = require("http");

//middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

<<<<<<< HEAD
//service methods
const auth = require("./controllers/auth");
const pods = require("./controllers/pods");
const activities = require("./controllers/activities");
=======
//database
const { Pool, Client } = require("pg");
const pgconfig = require("./config/pgconfig");
>>>>>>> f1799b6a44a2197c737df5553d00a60de09a4a2e

//authentication
const passport = require("passport");
const router = require("./routes/root");
const config = require("./config/config");
require("./config/passport-setup");
require("express-async-errors");

<<<<<<< HEAD
//database
const { Pool, Client } = require("pg");
const pgconfig = require("./config/pgconfig");
const connectionString = config.DATABASE_URI;
=======
>>>>>>> f1799b6a44a2197c737df5553d00a60de09a4a2e
/**
 * PG DB connection
 */

<<<<<<< HEAD
 const pool = new Pool({
     connectionString,
 });
=======
const pool = new Pool({
  user: pgconfig.dbuser,
  host: pgconfig.host,
  database: pgconfig.database,
  password: pgconfig.password,
  port: pgconfig.port,
});

>>>>>>> f1799b6a44a2197c737df5553d00a60de09a4a2e
/**
 * Middleware
 */

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [config.KEYS.cookie.secret],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: config.HOME_PAGE_DOMAIN, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(bodyParser.json());
app.use("/", router);

<<<<<<< HEAD
/**
 * Controller functions
 */

 
=======
// Open server for requests
const server = http.createServer(app);
server.listen(config.PORT, () => {
  logger.info(`Server is currently running on port ${config.PORT}`);
});
>>>>>>> f1799b6a44a2197c737df5553d00a60de09a4a2e
