const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ POST - Envoyer un message par groupId
router.post("/", async (req, res) => {
  const { groupId, sender, text } = req.body;

  if (!groupId || !sender || !text) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const message = new Message({
      groupId,
      sender,
      text,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error("❌ Erreur lors de l'enregistrement :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ GET - Récupérer les messages d’un groupe via son ID
router.get("/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.find({ groupId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
