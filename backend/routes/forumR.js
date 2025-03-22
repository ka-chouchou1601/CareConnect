const express = require("express");
const router = express.Router();
const Forum = require("../models/Forum");

// GET all forums
router.get("/", async (req, res) => {
  try {
    const forums = await Forum.find();
    res.json(forums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
