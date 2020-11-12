const express = require("express");
const {} = require("../controllers/activities");
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