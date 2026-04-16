const express = require("express");
const router = express.Router();

// TODO: Implement question routes
// GET /api/question/:path/:level

router.get("/:path/:level", (req, res) => {
  const { path, level } = req.params;
  res.json({
    message: `Questions for ${path} path, level ${level} - TODO: Implement question retrieval`,
    path,
    level,
    questions: [],
  });
});

module.exports = router;
