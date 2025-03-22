const mongoose = require("mongoose");

const chatbotMessageSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  aiResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatbotMessage", chatbotMessageSchema);
