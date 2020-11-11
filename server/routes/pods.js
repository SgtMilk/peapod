const express = require("express");
const { getPod, getPods, postPod, deletePod } = require("../controllers/pods");
const podsRouter = express.Router();

/* GET a pod */
podsRouter.get("/:id", getPod);
/* GET all pod */
podsRouter.get("/", getPods);
/* POST a pod */
podsRouter.post("/", postPod);
/* DELETE a pod */
podsRouter.delete("/:id", deletePod);

module.exports = podsRouter;
