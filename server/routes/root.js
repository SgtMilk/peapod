/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
const express = require("express");

//  Routers
const rootRouter = express.Router();
const authRouter = require("./auth");
const podsRouter = require("./pods");
const activitiesRouter = require("./activities");
const userRouter = require("./users");

rootRouter.use("/pods", podsRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/activities", activitiesRouter);
rootRouter.use("/user", userRouter);

module.exports = rootRouter;