/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
const express = require("express");

//  Routers
const rootRouter = express.Router();
const apiRouter = express.Router();
const authRouter = require("./auth");
const podsRouter = require("./pods");
const activitiesRouter = require("./activities");
const userRouter = require("./users");
const notificationsRouter = require("./notifications")

apiRouter.use("/notifications", notificationsRouter)
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/pods", podsRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/api", apiRouter);

module.exports = rootRouter;