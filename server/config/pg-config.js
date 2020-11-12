const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  connectionString: config.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
