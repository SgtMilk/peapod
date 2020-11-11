/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/**
 * Imports
 */
const pool = require("../config/pg-config");
const { v4: uuidv4 } = require("uuid");
const tables = require("../database/tables");
require("express-async-errors");

/**
 * Controller functions
 */
const getPod = async (req, res, next) => {
  //    VARIABLES
  const podID = req.params.id;
  const userID = req.user.user_uuid;
  //    DB
  const connection = await pool.connect();
  //    LOGIC
};

const getPods = (req, res, next) => {
  //    VARIABLES
  const userID = req.user.user_uuid;
  //    DB
  const connection = await pool.connect();
  //    LOGIC
};

const postPod = (req, res, next) => {
  //    VARIABLES
  const userID = req.user.user_uuid;
  //    DB
  const connection = await pool.connect();
  //    LOGIC
};

const deletePod = (req, res, next) => {
  //    VARIABLES
  const podID = req.user.user_uuid;
  const userID = req.user.user_uuid;
  //    DB
  const connection = await pool.connect();
  //    LOGIC
  const notificationsQuery = await connection.query(`DELETE from ${tables.notifications} WHERE pod_uuid=$1`, podID);
  const podUsersQuery = await connection.query(`DELETE from ${tables.pod_users} WHERE pod_uuid=$1`, podID);
  const podQuery = await connection.query(`DELETE from ${tables.pods} WHERE pod_creator_id=$1 AND pod_uuid=$2`, userID, podID);

  if (notificationsQuery.)
};

module.export = { getPod, getPods, postPod, deletePod };
