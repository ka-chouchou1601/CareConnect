const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST - envoyer un message
router.post("/", async (req, res) => {
  const { groupName, sender, text } = req.body;

  if (!groupName || !sender || !text) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const message = new Message({
      groupName,
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

// GET - récupérer les messages d’un groupe
router.get("/:groupName", async (req, res) => {
  const { groupName } = req.params;

  try {
    const messages = await Message.find({ groupName }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
