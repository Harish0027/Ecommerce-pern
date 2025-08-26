const { neon } = require("@neondatabase/serverless");
const dotenv = require("dotenv");

dotenv.config();

const sql = neon(
  `postgresql://neondb_owner:npg_QVp2HDr1btBJ@ep-dry-recipe-a8wp8gzt-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require`
);

module.exports = sql;
