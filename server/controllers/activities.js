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
const { activities } = require("../database/tables");
const { postRisk } = require("./risk-calculation/risk-calculation");
require("express-async-errors");

/**
 * Controller functions
 */
const postActivity = async (req, res, next) => {
    const activity = req.body.activity;
    const userId = req.user.user_uuid;
    const connection = await pool.connect();
    const uuid = uuidv4();
    console.log(activity.date);
    const date = new Date(activity.date).toDateString();
    console.log(date);
    const name = activity.name;
    const indoor = activity.indoor;
    const socialInteraction = activity.socialInteraction;
    const peoplePresent = activity.peoplePresent;
    const duration = activity.duration;
    const mask = activity.mask;
    try {
        const postNewActivity = await connection.query(
            `INSERT INTO ${tables.activities}(activity_id, user_uuid, name, date, indoor, socialinteraction, peoplepresent, duration, mask) VALUES ('${uuid}', '${userId}', '${name}', '${date}', '${indoor}', '${socialInteraction}', '${peoplePresent}', '${duration}', '${mask}');`
        );
        console.log("ayo gang")
        const newActivityQuery = await connection.query(
            `SELECT * FROM ${tables.activities} WHERE activity_id = '${uuid}';`
        );
        /* UPDATE USER'S RISK LEVEL */
        connection.release();
        const newActivity = newActivityQuery.rows[0];
        postRisk(userId);
        if (newActivity) {
            return res.status(200).json({
                success: true,
                message: `${newActivity.name} was created successfully.`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: `${newActivity.name} was not created.`,
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: `Bad request`
        })
    }
}

const getActivity = async (req, res, next) => {
    const uuid = req.params.id;
    const userId = req.user.user_uuid;
    const connection = await pool.connect();

    try {
        const getActivityQuery = await connection.query(
            `SELECT * FROM ${tables.activities} WHERE activity_id = '${uuid}' AND user_uuid = '${userId}';`
        );
        connection.release();
        const activity = getActivityQuery.rows[0];
        if (activity) {
            return res.status(200).json({
                success: true,
                message: `Get ${activity.name} successful.`,
                activity: activity
            })
        } else {
            return res.status(200).json({
                success: true,
                message: `Get ${activity.name} unsuccessful.`,
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Bad request`
        })
    }
}

const getActivities = async (req, res, next) => {
    const userId = req.user.user_uuid;

    const { limit } = req.query;
    const connection = await pool.connect();

    try {
        const queryLimit = limit ? limit : Number.MAX_SAFE_INTEGER;

        console.log("user: " + userId);

        /* PQ LIMIT isnt good */
        const getActivitiesQuery = await connection.query(
            `SELECT * FROM 
            ${tables.activities}
            WHERE user_uuid ='${userId}'
            ORDER BY date DESC
            LIMIT '${queryLimit}';`
        );
        connection.release();
        const activities = getActivitiesQuery.rows;

        console.log("activities: " + activities);
        if (activities.length != 0) {
            return res.status(200).json({
                success: true,
                message: `Got activities.`,
                activities: activities
            })
        } else {
            return res.status(200).json({
                success: true,
                message: `Got no activities.`,
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: `Bad request`
        })
    }
}

const deleteActivity = async (req, res, next) => {
    const uuid = req.params.id;
    const userId = req.user.user_uuid;
    const connection = await pool.connect();

    try {
        const getActivityQuery = await connection.query(
            `SELECT * FROM ${tables.activities} WHERE activity_id = '${uuid}' AND user_uuid = '${userId}';`
        )
        const deleteActivityQuery = await connection.query(
            `DELETE FROM ${tables.activities} WHERE activity_id = '${uuid}' AND user_uuid = '${userId}';`
        );
        connection.release();
        console.log(getActivityQuery.rows);
        const getActivity = getActivityQuery.rows[0];
        postRisk(userId);
        return res.status(200).json({
            success: true,
            message: `${getActivity.name} was deleted successfully.`
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: `Bad request`
        })
    }
}

module.exports = { postActivity, getActivity, getActivities, deleteActivity };