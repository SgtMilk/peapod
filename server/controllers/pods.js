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
  try {
    const podQuery = await connection.query(`SELECT * from ${tables.pods} WHERE pod_uuid=$1 `, podID);
    const pod = podQuery.rows[0];
    if (pod) {
      return res.status(200).json({
        success: true,
        message: `${podID} was successfully.`,
        pod
      })
    } else {
      return res.status(404).json({
        success: false,
        message: `${podID} was not found`,
      })
    }

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Bad request`
    })
  }
};

const getPods = async (req, res, next) => {
  //    VARIABLES
  const userID = req.user.user_uuid;
  const { limit } = req.query;
  //    DB
  const connection = await pool.connect();
  //    LOGIC
  try {
    const queryLimit = limit ? limit : 18446744073709551615;
    const podQuery = await connection.query(`SELECT (pod_uuid) from ${tables.pod_users} 
    WHERE user_uuid=$1 
    RIGHT JOIN ${tables.pods} ON pod_uuid = pod_uuid
    ORDER BY created_date LIMIT 0, $2`, [userID, queryLimit]);

    if (podQuery.rows[0]) {
      return res.status(200).json({
        success: true,
        message: `Pods found was successfully.`,
        pods
      })
    } else {
      return res.status(404).json({
        success: false,
        message: `No pods were found.`,
      })
    }

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Bad request`
    })
  }
};

const postPod = async (req, res, next) => {
  //    VARIABLES
  const { name, emails } = req.body;
  const userID = req.user.user_uuid;
  const podID = uuidv4();
  const notificationID = uuidv4();
  //    DB
  const connection = await pool.connect();
  //    LOGIC
  //  Create POD
  const createPodQuery = await connection.query(`
  INSERT INTO ${tables.pods} 
  (pod_uuid, name, pod_creator_id, created_date) 
  VALUES ('${podID}', ${name}', '${userID}', '${new Date()}')
  `)
  //  Create NOTIFICATIONS
  emails.forEach(async (email) => {
    if (email = "") return;
    const userQuery = await connection.query(`SELECT (user_uuid) FROM ${tables.users} WHERE email='${email}'`);
    const receiverID = userQuery.rows[0];
    if (!receiverID) return;
    const notificationsQuery = await connection.query(`
    INSERT INTO ${tables.notifications} 
    (notification_uuid, user_uuid, pod_uuid, sender_uuid, message, created_date )
    VALUES ('${notificationID}', '${receiverID}', '${podID}', '${userID}', 'You've been invited to a ${name}, join the pod part!', ${new Date()} )
    `);
  })
  //  Return Pod
  const podQuery = await connection.query(`SELECT * FROM ${tables.pods} WHERE pod_uuid=$1`, [podID]);
  const pod = podQuery.rows[0];
  if (pod) {
    return res.status(201).json({
      success: true,
      message: `${podID} created successfully.`,
      pod
    })
  } else {
    return res.status(400).json({
      success: false,
      message: `Pod could not be created.`
    })
  }
};

const deletePod = async (req, res, next) => {
  //    VARIABLES
  const podID = req.user.user_uuid;
  const userID = req.user.user_uuid;
  //    DB
  const connection = await pool.connect();
  //    LOGIC
  try {
    const notificationsQuery = await connection.query(`DELETE from ${tables.notifications} WHERE pod_uuid=$1`, podID);
    const podUsersQuery = await connection.query(`DELETE from ${tables.pod_users} WHERE pod_uuid=$1`, podID);
    const podQuery = await connection.query(`DELETE from ${tables.pods} WHERE pod_creator_id=$1 AND pod_uuid=$2`, userID, podID);
    return res.status(200).json({
      success: true,
      message: `${podID} was deleted successfully.`
    })
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: `${podID} was not deleted.`
    })
  }

};

module.exports = { getPod, getPods, postPod, deletePod };
