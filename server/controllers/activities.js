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
const postActivity = async (req, res, next) => {
    const activity = req.body;
    const connection = pool.connect();
    const uuid = uuidv4();

    try {
        (await connection).query(
            `INSERT INTO ${tables.activities}(activity_id, name, date, indoor, socialinteraction, proximity, peoplepresent) VALUES (${uuid}, ${activity.name}, ${activity.data}, ${activity.indoor}, ${activity.socialInteraction}, ${activity.proximity}, ${activity.peoplePresent});`
        );
        const newActivityQuery = (await connection).query(
            `SELECT (name) FROM ${tables.activities} WHERE activity_id = ${uuid};`
        );
        /* UPDATE USER'S RISK LEVEL */
        (await connection).release();
        const newActivity = newActivityQuery.rows[0];
        if (newActivity) {
            return res.status(200).json({
                success: true,
                message: `${newActivity.name} was created successfully.`
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `${newActivity.name} was not created.`,
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Bad request`
        })
    }
}

const getActivity = async (req, res, next) => {
    const uuid = req.params.id;
    const connection = pool.connect();

    try {
        const getActivityQuery = (await connection).query(
            `SELECT * FROM ${tables.activities} WHERE activity_id = ${uuid};`
        );
        (await connection).release();
        const getActivity = getActivityQuery.rows[0];
        if (getActivity) {
            return res.status(200).json({
                success: true,
                message: `Get ${getActivity.name} successful.`,
                getActivity
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `Get ${getActivity.name} unsuccessful.`,
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
    const connection = pool.connect();

    try {
        const queryLimit = limit ? limit : 18446744073709551615;
        const getActivitiesQuery = (await connection).query(
            `SELECT * FROM ${tables.activities} WHERE user_uuid = ${userId} ORDER BY date LIMIT 0, ${queryLimit};`
        );
        (await connection).release();
        activities = getActivitiesQuery.rows[0];
        if (activities) {
            return res.status(200).json({
                success: true,
                message: `Got activities.`,
                activities
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `Got no activities.`,
            })
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Bad request`
        })
    }
}

const deleteActivity = async (req, res, next) => {
    const uuid = req.params.id;
    const connection = pool.connect();

    try {
        const getActivityQuery = (await connection).query(
            `SELECT (name) FROM ${tables.activities} WHERE activity_id = ${uuid};`
        )
        const deleteActivityQuery = (await connection).query(
            `DELETE FROM ${tables.activities} WHERE activity_id = ${uuid};`
        );
        (await connection).release();
        const getActivity = getActivityQuery.rows[0];
        const deleteActivity = deleteActivityQuery.rows[0];
        if (deleteActivity) {
            return res.status(200).json({
                success: true,
                message: `${getActivity.name} was deleted successfully.`
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `Delete ${getActivity.name} unsuccessful.`,
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Bad request`
        })
    }
}

module.exports = { postActivity, getActivity, getActivities, deleteActivity };