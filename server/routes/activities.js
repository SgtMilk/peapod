const express = require("express");
const {} = require("../controllers/activities");
const activitiesRouter = express.Router();
const { authCheck } = require("../controllers/auth");

/* POST an activity */
activitiesRouter.post("/", authCheck, postActivity);
/* GET an activity */
activitiesRouter.get("/", authCheck, getActivity);
/* GET all activities within the last month */
activitiesRouter.get("/:param", authCheck, getActivities);
/* GET three activities */
activitiesRouter.get("/:param", authCheck, getActivities);
/* DELETE an activity */
activitiesRouter.delete("/", authCheck, deleteActivity);

module.exports = activitiesRouter;