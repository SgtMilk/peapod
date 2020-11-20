/*
*   Imports
*/
const pool = require("../../config/pg-config");
const tables = require("../../database/tables");
require("express-async-errors");

/*
*   Method
*/
const postRisk = async (userId) => {

    const connection = await pool.connect();

    try {
        const getActivitiesQuery = await connection.query(
            `SELECT * FROM ${tables.activities} WHERE user_uuid = '${userId}';`
        )
        const activities = getActivitiesQuery.rows;
        const getUserQuery = await connection.query(
            `SELECT * FROM ${tables.users} WHERE user_uuid = '${userId}';`
        )
        const hasCovid = getUserQuery.rows[0].hascovid;
        const risk = riskCalculation(activities, hasCovid);
        console.log("risk" + risk);
        const updateUserQuery = await connection.query(`UPDATE ${tables.users} SET risklevel='${risk}' WHERE user_uuid='${userId}';`);
        connection.release();
    } catch (err) {
        console.log(err);
    }

}

/*
*   Calculation
*/


const riskCalculation = (activities, hasCovid) => {
    const todaysDate = new Date();

    const covid = hasCovid ? 100 : 0;
    let risk1to4 = 0;
    let count1to4 = 0;
    let risk5to10 = 0;
    let count5to10 = 0;
    let risk10to14 = 0;
    let count10to14 = 0;

    for (let i = 0; i < activities.length; i++) {
        if (todaysDate - activities[i].date < 345600000 && activities[i].date <= todaysDate) {
            const activityRisk = calculateActivityRisk(activities[i]);
            console.log("activity risk: " + activityRisk);
            console.log("smt: " + risk1to4)
            risk1to4 = risk1to4 + activityRisk;
            console.log("risk 1 to 4: " + risk1to4);
            count1to4++;
        } else if (todaysDate - activities[i].date < 864000000 && activities[i].date <= todaysDate) {
            const activityRisk = calculateActivityRisk(activities[i]);
            risk5to10 = risk5to10 + activityRisk;
            count5to10++;
        } else if (todaysDate - activities[i].date < 1209600000 && activities[i].date <= todaysDate) {
            const activityRisk = calculateActivityRisk(activities[i]);
            risk10to14 = risk10to14 + activityRisk;
            count10to14++;
        }
    }

    console.log("1-4: " + risk1to4 + " 1-4 (count): " + count1to4 + " 5-10: " + risk5to10 + " 5-10 (count): " + count5to10 + " 10-14: " + risk10to14 + " 10-14 (count): " + count10to14);

    const sumAll = ((risk1to4 * count1to4) / 2) + ((risk5to10 * count5to10) / 4) + ((risk10to14 * count10to14) / 8) + covid;
    console.log(sumAll);
    if (sumAll > 100) {
        return 100;
    } else {
        return Math.round(sumAll);
    }

}

function calculateActivityRisk(activity) {
    console.log("activity:");
    console.log(activity);

    const socialinteraction = activity.socialinteraction ? 1 : 0;
    const mask = activity.mask ? 1 : 0;
    const indoor = activity.indoor ? 1 : 0;

    const line1 = (parseInt(activity.peoplepresent) + parseInt(activity.duration));
    console.log("line 1: " + line1);
    const line2 = (1 + socialinteraction);
    console.log("line 2: " + line2);
    const line3 = (1 + mask);
    console.log("line 3: " + line3);
    const line4 = (1 + indoor);
    console.log("line 4: " + line4);

    const sum = line1 + line2 + line3 + line4;
    console.log("sum: " + sum);
    return sum;
}

module.exports = { postRisk };