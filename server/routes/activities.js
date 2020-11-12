/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

const express = require("express");
const { postActivity, getActivity, getActivities, deleteActivity } = require("../controllers/activities");
const activitiesRouter = express.Router();
const { authCheck } = require("../controllers/auth");

/* POST an activity */
activitiesRouter.post("/", authCheck, postActivity);
/* GET an activity by uuid */
activitiesRouter.get("/", authCheck, getActivity);
/* GET all activities for a user or get 3 activities from the user, sorted by date created */
activitiesRouter.get("/", authCheck, getActivities);
/* DELETE an activity */
activitiesRouter.delete("/", authCheck, deleteActivity);

module.exports = activitiesRouter;