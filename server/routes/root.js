/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
const express = require("express");

//  Routers
const authRouter = require("./auth");
const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
