import auth from "./auth";

const express = require("express");

//  Routers
const authRouter = require("./auth");
const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);

export default rootRouter;
