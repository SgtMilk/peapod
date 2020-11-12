/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/**
* Imports
*/
const express = require("express")
const { updateUser } = require("../controllers/users");
const userRouter = express.Router();
const { authCheck } = require("../controllers/auth")

userRouter.put("/", authCheck, updateUser);

module.exports = userRouter;