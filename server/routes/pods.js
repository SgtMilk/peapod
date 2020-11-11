const express = require("express");
const { getPod, getPods, postPod, deletePod } = require("../controllers/pods");
const podsRouter = express.Router();
const { authCheck } = require("../controllers/auth")

/* GET a pod */
podsRouter.get("/:id", authCheck, getPod);
/* GET all pod */
podsRouter.get("/", authCheck, getPods);
/* POST a pod */
podsRouter.post("/", authCheck, postPod);
/* DELETE a pod */
podsRouter.delete("/:id", authCheck, deletePod);

module.exports = podsRouter;
