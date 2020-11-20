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

//authentication
const passport = require("passport");
const router = require("./routes/root");
const config = require("./config/config");
require("./config/passport-setup");
require("express-async-errors");

/**
 * Middleware
 */

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [config.COOKIE_SECRET],
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

app.use(express.static("./peapod/build"));
//browser request for the web app
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.sendFile("index.html", { root: "./peapod/build" });
});

// Open server for requests
const server = http.createServer(app);
server.listen(config.PORT, () => {
  console.log(`Server is currently running on port ${config.PORT}`);
});
