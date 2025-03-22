const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: String }], // Liste des membres
  image: { type: String }, // URL de l'image du groupe
});

module.exports = mongoose.model("Forum", forumSchema);
