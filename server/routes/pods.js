/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

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
