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
const updateUser = async (req, res, next) => {
    //  VARIABLES
    const userID = req.user.user_uuid;
    const { hascovid } = req.body;
    //  DB
    const connection = await pool.connect();
    //  LOGIC
    const updateUserQuery = await connection.query(`UPDATE ${tables.users} SET hascovid=$1 WHERE user_uuid=$2;`, [hascovid, userID]);
    const userQuery = await connection.query(`SELECT * FROM ${tables.users} WHERE user_uuid=$1;`, [userID])
    const user = userQuery.rows[0];
    (await connection).release();
    if (!user) {
        return res.status(200).json({
            success: false,
            message: `${userID} has not been updated.`,
        })
    }
    return res.status(200).json({
        success: true,
        message: `${userID} has been updated.`,
        user
    })
}

module.exports = { updateUser };