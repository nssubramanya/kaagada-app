const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes (stubs for now)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/question", require("./routes/question"));
app.use("/api/user", require("./routes/user"));

// Root route response
app.get("/", (req, res) => {
  res.json({
    message: "Kaagada API Server is running!",
    environment: process.env.NODE_ENV || "development",
    port: PORT,
    endpoints: {
      auth: "/api/auth",
      progress: "/api/progress",
      questions: "/api/question",
      users: "/api/user",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
