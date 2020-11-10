const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  connectionString: config.DATABASE_URI,
});

module.exports = pool;
