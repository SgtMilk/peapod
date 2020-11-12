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
const { use } = require("passport");
require("express-async-errors");

const getNotification = async (req, res, next) => {
    //  VARIABLES
    const { podID } = req.params.id;
}

const getNotifications = async (req, res, next) => {

}

const putNotification = async (req, res, next) => {
    //  VARIABLES
    const userID = req.user.user_uuid;
    const notificationID = req.params.id;
    const { accepted } = req.body;
    //  DB
    const connection = await pool.connect();
    //  LOGIC
    const updateNotificationQuery = await connection.query(`UPDATE ${tables.notifications} SET accepted=$1 WHERE notification_uuid=$2 AND user_uuid=$3`, [accepted, notificationID, userID])
    const notificationQuery = await connection.query(`SELECT * FROM ${tables.notifications} WHERE notification_uuid=$1 AND user_uuid=$2`, [notificationID, userID]);
    const notification = notificationQuery.rows[0];
    const createPodUsers = await connection.query(`INSERT INTO ${tables.pod_users} (pod_uuid, user_uuid) VALUES ('${notification.pod_uuid}', '${userID}')`);
    return res.status(200).json({
        success: true,
        message: `${notificationID} has been updated.`,
        notification
    });
}

module.exports = { getNotifications, putNotification, getNotification };