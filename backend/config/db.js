const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ Fix: No deprecated options
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
