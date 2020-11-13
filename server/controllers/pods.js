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
    const podQuery = await connection.query(`SELECT * FROM ${tables.pods}
    WHERE pod_uuid IN 
    (SELECT pod_uuid FROM ${tables.pod_users}
      WHERE pod_uuid = '${podID}' AND user_uuid = '${userID}');`);
    const pod = podQuery.rows[0];
    connection.release();
    if (pod) {
      return res.status(200).json({
        success: true,
        message: `${podID} was successfully.`,
        pod: pod
      })
    } else {
      return res.status(200).json({
        success: true,
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
    const queryLimit = limit ? limit : Number.MAX_SAFE_INTEGER;

    const podUsersQuery = await connection.query(`SELECT (pod_uuid) FROM ${tables.pod_users} WHERE user_uuid = '${userID}';`);
    const podUsers = podUsersQuery.rows;
    console.log(JSON.stringify(podUsers));
    let pods = [];
    

    for (let i = 0; i < podUsers.length; i++) {
      let users = [];

      const podQuery = await connection.query(`SELECT * FROM ${tables.pods} WHERE pod_uuid='${podUsers[i].pod_uuid}';`);
      console.log(JSON.stringify(podQuery.rows));
      const usersPerPodQuery = await connection.query(`SELECT (user_uuid) FROM ${tables.pod_users} WHERE pod_uuid='${podUsers[i].pod_uuid}';`);
      const usersPerPod = usersPerPodQuery.rows;
      for (let j = 0; j < usersPerPod.length; j++) {
        const userQuery = await connection.query(`SELECT (firstname, lastname, risklevel, hascovid) FROM ${tables.users} WHERE user_uuid='${usersPerPod[j].user_uuid}';`);
        const user = userQuery.rows[0];
        users[j] = user;
      }
      const pod = podQuery.rows[0];
      console.log(pod);
      pods[i] = pod;
      pods[i].users = users;
      console.log(pods[i]);
    }
    connection.release();

    if (pods.length != 0) {
      return res.status(200).json({
        success: true,
        message: `Pods found was successfully.`,
        pods: pods.sort((a, b) => b.created_date - a.created_date).slice(0, queryLimit)
      })
    } else {
      return res.status(200).json({
        success: true,
        message: `No pods were found.`,
      })
    }


  } catch (err) {
    console.log(err);
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
  try {
    const createPodQuery = await connection.query(`
  INSERT INTO ${tables.pods} 
  (pod_uuid, name, pod_creator_id, created_date) 
  VALUES ('${podID}', '${name}', '${userID}', '${new Date().toDateString()}');
  `)

    const createPodUsers = await connection.query(`
  INSERT INTO ${tables.pod_users} 
  (pod_uuid, user_uuid) 
  VALUES ('${podID}', '${userID}');
  `)
    //  Create NOTIFICATIONS
    emails.forEach(async (email) => {
      if (email = "") return;
      const userQuery = await connection.query(`SELECT (user_uuid) FROM ${tables.users} WHERE email='${email}';`);
      const receiverID = userQuery.rows[0];
      if (!receiverID) return;
      const notificationsQuery = await connection.query(`
    INSERT INTO ${tables.notifications} 
    (notification_uuid, user_uuid, pod_uuid, sender_uuid, message, created_date, accepted )
    VALUES ('${notificationID}', '${receiverID}', '${podID}', '${userID}', 'You've been invited to a ${name}, join the pod party!', '${new Date()}', FALSE);
    `);
    })
    //  Return Pod
    const podQuery = await connection.query(`SELECT * FROM ${tables.pods} WHERE pod_uuid='${podID}';`);
    const pod = podQuery.rows[0];
    connection.release();
    if (pod) {
      return res.status(200).json({
        success: true,
        message: `${podID} created successfully.`,
        pod: pod
      })
    } else {
      return res.status(400).json({
        success: false,
        message: `Pod could not be created.`
      })
    }
  } catch (err) {
    console.log(err)
  }
};

const deletePod = async (req, res, next) => {
  //    VARIABLES
  const podID = req.user.user_uuid;
  const userID = req.user.user_uuid;
  //    DB
  const connection = await pool.connect();
  //    LOGIC
  const getPod = await connection.query(`SELECT * FROM ${tables.pods} WHERE pod_uuid='${podID}' AND pod_creator_id='${userID}';`);
  if (!getPod.rows[0]) {
    connection.release();
    return res.status(401).json({ success: false, message: `You are not authorized to delete that pod.` })
  }
  try {
    const notificationsQuery = await connection.query(`DELETE from ${tables.notifications} WHERE pod_uuid='${podID}';`);
    const podUsersQuery = await connection.query(`DELETE from ${tables.pod_users} WHERE pod_uuid='${podID}';`);
    const podQuery = await connection.query(`DELETE from ${tables.pods} WHERE pod_creator_id='${userID}' AND pod_uuid='${podID}';`);
    connection.release();
    return res.status(200).json({
      success: true,
      message: `${podID} was deleted successfully.`
    })
  } catch (err) {
    connection.release();
    return res.status(400).json({
      success: false,
      message: `${podID} was not deleted.`
    })
  }

};

module.exports = { getPod, getPods, postPod, deletePod };
