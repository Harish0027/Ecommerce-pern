const express = require("express");
const cors = require("cors");
const ProductRouter = require("./routes/ProductRouter");
const sql = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// routes
app.use("/api/product", ProductRouter);

// connecting to db
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log("✅ Database initialized");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
}

initDB();

app.listen(port, () => {
  console.log(`🚀 This app is running on http://localhost:${port}`);
});
