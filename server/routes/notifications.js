/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

const express = require("express");
const { authCheck } = require("../controllers/auth")
const { getNotifications, putNotification, getNotification } = require("../controllers/notifications")
const notificationsRouter = express.Router();

notificationsRouter.get("/:id", authCheck, getNotification);
notificationsRouter.get("/", authCheck, getNotifications);
notificationsRouter.put("/:id", authCheck, putNotification);

module.exports = notificationsRouter;