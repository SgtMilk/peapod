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

const getNotification = async (req, res, next) => {
    //  VARIABLES
    const { podID } = req.params.id;
}

const getNotifications = async (req, res, next) => {

}

const putNotification = async (req, res, next) => {
    //  VARIABLES
    const podID = req.params.id;

    //  DB
    const connection = await pool.connect();
    //  LOGIC
}

module.exports = { getNotifications, putNotification, getNotification };