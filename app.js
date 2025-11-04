// backend/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
require("./conn/connection");

const auth = require("./routes/auth");
const list = require("./routes/list");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "*", // allow all for now (or specify frontend URL)
  credentials: true
}));
app.use(express.json());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// ✅ Correct static path (since dist is inside backend/frontend)
const staticPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(staticPath));

// ✅ Catch-all route for React/Vite (handles refresh + direct links)
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
